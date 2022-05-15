﻿using Microsoft.AspNetCore.Identity;
using Application.Interfaces;
using Domain.Entities;
using System.Threading.Tasks;
using Application.DTOs.EventDTOs;
using System.Linq;
using AutoMapper;
using Domain.Contexts;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Application.DTOs.UserDTOs;
using System.IO;

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

        public async Task<bool> UploadMainImage(FileUpload fileObj, int eventId)
        {
            if (fileObj.files.Length > 0)
            {
                var @event = await _context.Events.Where(x => x.Id == eventId).SingleOrDefaultAsync();
                if (@event == null)
                    return false;
                using (var ms = new MemoryStream())
                {
                    ms.Flush();
                    ms.Position = 0;
                    await fileObj.files.CopyToAsync(ms);
                    var fileBytes = ms.ToArray();
                    @event.MainImage = fileBytes;
                    _context.Events.Update(@event);
                    if (await SaveChangesAsync())
                        return true;
                }
            }
            return false;
        }

        public async Task<Event> AddEvent(CreateEventDTO @event)
        {
            Event eventToAdd = new();
            eventToAdd = _mapper.Map(@event, eventToAdd);
            eventToAdd.Organiser = _eventUsersService.GetCurrentUser();
            if (eventToAdd == null)
                return null;

            await _context.Events.AddAsync(eventToAdd);
            return eventToAdd;
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

        public async Task<List<ReturnEventsAsListDTO>> GetEvents(string Location, string MonthAndYear, string UserId)
        {
            if (!string.IsNullOrEmpty(UserId))
            {
                var user = await _context.Users.Where(x => x.Id == UserId).Include(p => p.ParticipatedEvents).ThenInclude(o => o.Organiser).SingleOrDefaultAsync(); 
                var availableEvents = user.ParticipatedEvents
                .Where(p => (Location == null || p.Place == Location))
                .Where(p => (MonthAndYear == null || p.StartDate.Month.ToString() + "/" + p.StartDate.Year.ToString() == MonthAndYear))
                .ToList();
                List<ReturnEventsAsListDTO> eventsToReturn = _mapper.Map<List<Event>, List<ReturnEventsAsListDTO>>(availableEvents);
                eventsToReturn = eventsToReturn.OrderByDescending(x => x.StartDate).ToList();
                return eventsToReturn;
            }
            else {
                var availableEvents = await _context.Events.Include(o => o.Organiser)
                .Where(p => (Location == null || p.Place == Location))
                .Where(p => (MonthAndYear == null || p.StartDate.Month.ToString() + "/" + p.StartDate.Year.ToString() == MonthAndYear))
                .ToListAsync();
                List<ReturnEventsAsListDTO> eventsToReturn = _mapper.Map<List<Event>, List<ReturnEventsAsListDTO>>(availableEvents);
                eventsToReturn = eventsToReturn.OrderByDescending(x => x.StartDate).ToList();
                return eventsToReturn;
            }
        }

        public bool ModifyEvent(ModifyEventDTO @event, int id)
        {
            var eventToModify = _context.Events.Where(x => x.Id == id).Include(o => o.Organiser).SingleOrDefault();
            var currentUserId = _eventUsersService.GetCurrentUser().Id;
            var eventToModifyId = eventToModify.Organiser.Id;
            if (eventToModify == null || currentUserId != eventToModifyId)
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

        public async Task<ReturnEventExtendedDTO> GetEventById(int id)
        {
            var foundEvent = await _context.Events.Where(x => x.Id == id).Include(o => o.Organiser).Include(t => t.Tags).SingleOrDefaultAsync();
            ReturnEventExtendedDTO eventToReturn = _mapper.Map<Event, ReturnEventExtendedDTO>(foundEvent);
            return eventToReturn;
        }
    }
}
