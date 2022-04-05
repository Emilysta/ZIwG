using Microsoft.AspNetCore.Identity;
using Application.Interfaces;
using Domain.Entities;
using System.Threading.Tasks;
using Application.DTOs.EventDTOs;
using System.Linq;
using AutoMapper;
using Domain.Contexts;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class EventService : IEventService
    {
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;
        private readonly IEventUsersService _eventUsersService;

        public EventService (IMapper mapper, DataBaseContext context, IEventUsersService eventUsersService)
        {
            _mapper = mapper;
            _context = context;
            _eventUsersService = eventUsersService;
        }
        public async Task<bool> AddEvent(CreateDTO @event)
        {
            Event eventToAdd = new Event();
            eventToAdd = _mapper.Map(@event, eventToAdd);
            eventToAdd.OrganiserId = _eventUsersService.GetCurrentUser().Id;
            if (eventToAdd == null)
                return false;

            await _context.Events.AddAsync(eventToAdd);
            return true;
        }
        public bool DeleteEvent(int id)
        {
            var eventToDelete = _context.Events.Where(x => x.Id == id).SingleOrDefault();
            if (eventToDelete == null)
                return false;
            else
            {
                _context.Events.Remove(eventToDelete);
                return true;
            }
        }

        public async Task<List<ReturnDTO>> GetEvents(string Location, string MonthId, string UserId)
        {
            if (!string.IsNullOrEmpty(UserId))
            {
                var user = await _context.Users.Where(x => x.Id == UserId).Include(e => e.Events).SingleOrDefaultAsync(); 
                var availableEvents = user.Events
                .Where(p => (Location == null || p.Place == Location))
                .Where(p => (MonthId == null || p.Date.Month.ToString() == MonthId))
                .ToList();
                List<ReturnDTO> eventsToReturn = _mapper.Map<List<Event>, List<ReturnDTO>>(availableEvents);
                eventsToReturn = eventsToReturn.OrderByDescending(x => x.Date).ToList();
                return eventsToReturn;
            }
            else {
                var availableEvents = await _context.Events
                .Where(p => (Location == null || p.Place == Location))
                .Where(p => (MonthId == null || p.Date.Month.ToString() == MonthId))
                .ToListAsync();
                List<ReturnDTO> eventsToReturn = _mapper.Map<List<Event>, List<ReturnDTO>>(availableEvents);
                eventsToReturn = eventsToReturn.OrderByDescending(x => x.Date).ToList();
                return eventsToReturn;
            }
            
            

            
        }

        public bool ModifyEvent(ModifyDTO @event, int id)
        {
            var eventToModify = _context.Events.Where(x => x.Id == id).SingleOrDefault();

            if (eventToModify == null)
                return false;

            eventToModify = _mapper.Map(@event, eventToModify);

            _context.Events.Update(eventToModify);
            return true;
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
