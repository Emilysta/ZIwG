using Microsoft.AspNetCore.Identity;
using Application.Interfaces;
using Domain.Entities;
using System.Threading.Tasks;
using Application.DTOs.UserDTOs;
using System.Linq;
using AutoMapper;
using Domain.Contexts;

namespace Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;

        public UserService (UserManager<User> userManager, IMapper mapper, DataBaseContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        
        public bool ChangeDisplayData(DisplayDataDTO model, string id)
        {
            var userToModify = _context.Users.Where(x => x.Id == id).SingleOrDefault();
            if (userToModify == null)
                return false;

            userToModify = _mapper.Map(@model, userToModify);
            _context.Users.Update(userToModify);
            return true;
        }
        
        public bool DeleteUser(string id)
        {
            var userToDelete = _context.Users.Where(x => x.Id == id).SingleOrDefault();
            if (userToDelete == null)
                return false;

            else
            {
                _context.Users.Remove(userToDelete);
                return true;
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
