using Microsoft.AspNetCore.Identity;
using Application.Interfaces;
using Domain.Entities;
using System.Threading.Tasks;
using Application.DTOs.EventDTOs;
using System.Linq;
using AutoMapper;
using Domain.Contexts;

namespace Infrastructure.Services
{
    public class EventService : IEventService
    {
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;

        public EventService (IMapper mapper, DataBaseContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<bool> AddEvent(CreateDTO @event)
        {
            Event eventToAdd = new Event();
            eventToAdd = _mapper.Map(@event, eventToAdd);

            if (eventToAdd == null)
                return false;

            await _context.Events.AddAsync(eventToAdd);
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
