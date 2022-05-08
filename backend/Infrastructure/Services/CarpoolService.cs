using Microsoft.AspNetCore.Identity;
using Application.Interfaces;
using Domain.Entities;
using System.Threading.Tasks;
using Application.DTOs.CarpoolDTOs;
using System.Linq;
using AutoMapper;
using Domain.Contexts;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class CarpoolService : ICarpoolService
    {
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;
        private readonly ICarpoolUsersService _carpoolUsersService;

        public CarpoolService(IMapper mapper, DataBaseContext context, ICarpoolUsersService carpoolUsersService)
        {
            _mapper = mapper;
            _context = context;
            _carpoolUsersService = carpoolUsersService;
        }
        public async Task<bool> AddEvent(CreateCarpoolDTO carpool)
        {
            Carpool carpoolToAdd = new();
            carpoolToAdd = _mapper.Map(carpool, carpoolToAdd);
            carpoolToAdd.DriverId = _carpoolUsersService.GetCurrentUser().Id;
            if (carpoolToAdd == null)
                return false;

            await _context.Carpools.AddAsync(carpoolToAdd);
            return true;
        }
        public bool DeleteCarpool(int id)
        {
            var carpoolToDelete = _context.Carpools.Where(x => x.Id == id).SingleOrDefault();
            if (carpoolToDelete == null)
                return false;
            else
            {
                _context.Carpools.Remove(carpoolToDelete);
                return true;
            }
        }
        public bool ModifyCarpool(ModifyCarpoolDTO carpool, int id)
        {
            var carpoolToModify = _context.Carpools.Where(x => x.Id == id).SingleOrDefault();

            if (carpoolToModify == null)
                return false;

            carpoolToModify = _mapper.Map(carpool, carpoolToModify);

            _context.Carpools.Update(carpoolToModify);
            return true;
        }
        public async Task<List<ReturnCarpoolDTO>> GetCarpools(string MonthAndYear, string UserId)
        {
            if (!string.IsNullOrEmpty(UserId))
            {
                var user = await _context.Users.Where(x => x.Id == UserId).Include(e => e.ParticipatedEvents).SingleOrDefaultAsync();
                var availableCarpools = user.Carpools
                .Where(p => (MonthAndYear == null || (p.StartDate.Month.ToString() + "/" + p.StartDate.Year.ToString() == MonthAndYear)))
                .ToList();
                List<ReturnCarpoolDTO> carpoolsToReturn = _mapper.Map<List<Carpool>, List<ReturnCarpoolDTO>>(availableCarpools);
                carpoolsToReturn = carpoolsToReturn.OrderByDescending(x => x.StartDate).ToList();
                return carpoolsToReturn;
            }
            else
            {
                var availableCarpools = await _context.Carpools
                .Where(p => (MonthAndYear == null || (p.StartDate.Month.ToString() + "/" + p.StartDate.Year.ToString() == MonthAndYear)))
                .ToListAsync();
                List<ReturnCarpoolDTO> carpoolsToReturn = _mapper.Map<List<Carpool>, List<ReturnCarpoolDTO>>(availableCarpools);
                carpoolsToReturn = carpoolsToReturn.OrderByDescending(x => x.StartDate).ToList();
                return carpoolsToReturn;
            }
        }
            public async Task<bool> SaveChangesAsync()
        {
            if (await _context.SaveChangesAsync() > 0)
            {
                return true;
            }
            return false;
        }

    }
}
