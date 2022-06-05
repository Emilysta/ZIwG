using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using AutoMapper;
using Domain.Contexts;
using Domain.Entities;
using Application.Interfaces;
using QuestPDF.Fluent;

namespace Infrastructure.Services
{
    public class EventUsersService : IEventUsersService
    {
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _accessor;

        public EventUsersService(IMapper mapper, DataBaseContext context, IHttpContextAccessor accessor)
        {
            _mapper = mapper;
            _context = context;
            _accessor = accessor;
        }

        public User GetCurrentUser()
        {
            string email = _accessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
            var user = _context.Users.Where(x => x.Email == email).Include(e => e.ParticipatedEvents).SingleOrDefault();
            return user;
        }

        public bool SignCurrentUserToEvent(int eventId)
        {
            var userToSign = GetCurrentUser();
            var eventToSign = _context.Events.Where(x => x.Id == eventId).Include(x => x.Users).SingleOrDefault();
            if (userToSign == null || eventToSign == null || (eventToSign.IsTicketLimit == true && eventToSign.Users.Count() == eventToSign.TicketLimit) || eventToSign.Users.Any(x => x.Id == userToSign.Id))
                return false;
            eventToSign.Users.Add(userToSign);
            _context.Events.Update(eventToSign);
            userToSign.ParticipatedEvents.Add(eventToSign);
            _context.Users.Update(userToSign);
            return _context.SaveChanges() > 0;
        }

        public bool SignOutCurrentUserFromEvent(int eventId)
        {
            var userToSign = GetCurrentUser();
            var eventToSign = _context.Events.Where(x => x.Id == eventId).Include(x => x.Users).SingleOrDefault();
            if (userToSign == null || eventToSign == null)
                return false;
            eventToSign.Users.Remove(userToSign);
            _context.Events.Update(eventToSign);
            userToSign.ParticipatedEvents.Remove(eventToSign);
            _context.Users.Update(userToSign);
            return _context.SaveChanges() > 0;
        }

        public byte[] GeneratePDF(int eventId)
        {
            var user = GetCurrentUser();
            var @event = _context.Events.Where(x => x.Id == eventId).Include(x => x.Users).Include(x => x.Organiser).SingleOrDefault();
            if (@event.Users.Contains(user)){
                var filePath = @"C:\Users\kacpe\Desktop\invoice.pdf";
                TicketDTO model = new TicketDTO();
                model = _mapper.Map<Event, TicketDTO> (@event);
                model.FirstName = user.FirstName;
                model.LastName = user.LastName;
                model.DateOfBirth= user.DateOfBirth;
                var document = new InvoiceDocument(model);
                var pdf = document.GeneratePdf();
                return pdf;
            }
            return null;
        }
    }
}
