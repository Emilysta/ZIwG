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
            if (fileObj.files!=null)
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
            if (eventToAdd == null || eventToAdd.Organiser == null)
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

        public async Task<List<ReturnEventsAsListDTO>> GetEvents(string Location, string MonthAndYear, string UserId, string Organiserid)
        {
            if (!string.IsNullOrEmpty(UserId))
            {
                var user = await _context.Users.Where(x => x.Id == UserId).Include(p => p.ParticipatedEvents).ThenInclude(o => o.Organiser).SingleOrDefaultAsync(); 
                var availableEvents = user.ParticipatedEvents
                .Where(p => (Location == null || p.Place == Location))
                .Where(p => (Organiserid == null || p.Organiser.Id == Organiserid))
                .Where(p => (MonthAndYear == null || p.StartDate.Month.ToString() + "/" + p.StartDate.Year.ToString() == MonthAndYear))
                .ToList();
                List<ReturnEventsAsListDTO> eventsToReturn = _mapper.Map<List<Event>, List<ReturnEventsAsListDTO>>(availableEvents);
                eventsToReturn = eventsToReturn.OrderByDescending(x => x.StartDate).ToList();
                foreach (var ev in eventsToReturn)
                {
                    ev.StartDate = ev.StartDate.ToLocalTime().ToUniversalTime();
                    ev.EndDate = ev.EndDate.ToLocalTime().ToUniversalTime();
                }
                return eventsToReturn;
            }
            else {
                var availableEvents = await _context.Events.Include(o => o.Organiser)
                .Where(p => (Location == null || p.Place == Location))
                .Where(p => (Organiserid == null || p.Organiser.Id == Organiserid))
                .Where(p => (MonthAndYear == null || p.StartDate.Month.ToString() + "/" + p.StartDate.Year.ToString() == MonthAndYear))
                .ToListAsync();
                List<ReturnEventsAsListDTO> eventsToReturn = _mapper.Map<List<Event>, List<ReturnEventsAsListDTO>>(availableEvents);
                eventsToReturn = eventsToReturn.OrderByDescending(x => x.StartDate).ToList();
                foreach (var ev in eventsToReturn)
                {
                    ev.StartDate = ev.StartDate.ToLocalTime().ToUniversalTime();
                    ev.EndDate = ev.EndDate.ToLocalTime().ToUniversalTime();
                }
                return eventsToReturn;
            }
        }

        public bool ModifyEvent(ModifyEventDTO @event, int id)
        {
            var eventToModify = _context.Events.Where(x => x.Id == id).Include(o => o.Organiser).SingleOrDefault();
            if (eventToModify == null)
            {
                return false;
            }
            var currentUserId = _eventUsersService.GetCurrentUser().Id;
            if (currentUserId != eventToModify.Organiser.Id)
            {
                return false;
            }
            var eventToModify2 = _mapper.Map(@event, eventToModify);

            _context.Events.Update(eventToModify2);
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
            var foundEvent = await _context.Events.Where(x => x.Id == id).Include(o => o.Organiser).Include(t => t.Tags).Include(u => u.Users).SingleOrDefaultAsync();
            if(foundEvent == null)
            {
                return null;
            }
            User user = _eventUsersService.GetCurrentUser();
            ReturnEventExtendedDTO eventToReturn = _mapper.Map<Event, ReturnEventExtendedDTO>(foundEvent);
            eventToReturn.StartDate = eventToReturn.StartDate.ToLocalTime().ToUniversalTime();
            eventToReturn.EndDate = eventToReturn.EndDate.ToLocalTime().ToUniversalTime();
            int signed = 0;
            if (foundEvent.Users != null)
                signed = foundEvent.Users.Count;
            if (user != null)
                eventToReturn.IsInterested = foundEvent.Users.Contains(user);
            int available = 0;
            if (foundEvent.IsTicketLimit)
                available = foundEvent.TicketLimit - signed;
            else
                available = int.MaxValue;
            eventToReturn.Signed = signed;
            eventToReturn.Available = available;
            return eventToReturn;
        }
    }
}
