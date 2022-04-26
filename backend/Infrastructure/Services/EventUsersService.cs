using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Application.DTOs.EventDTOs;
using AutoMapper;
using Domain.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

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
            var user = _context.Users.Where(x => x.Email == email).Include(e => e.Events).SingleOrDefault();
            return user;
        }

        public bool SignCurrentUserToEvent(int eventId)
        {
            var userToSign = GetCurrentUser();
            var eventToSign = _context.Events.Where(x => x.Id == eventId).Include(x => x.Users).SingleOrDefault();
            if (userToSign == null || eventToSign == null || eventToSign.Users.Count() == eventToSign.UsersLimit || eventToSign.Users.Any(x => x.Id == userToSign.Id))
                return false;
            eventToSign.Users.Add(userToSign);
            _context.Events.Update(eventToSign);
            userToSign.Events.Add(eventToSign);
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
            userToSign.Events.Remove(eventToSign);
            _context.Users.Update(userToSign);
            return _context.SaveChanges() > 0;
        }
    }
}
