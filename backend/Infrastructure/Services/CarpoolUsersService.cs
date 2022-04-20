using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Application.DTOs.CarpoolDTOs;
using AutoMapper;
using Domain.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Infrastructure.Services
{
    public class CarpoolUsersService : ICarpoolUsersService
    {
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _accessor;

        public CarpoolUsersService(IMapper mapper, DataBaseContext context, IHttpContextAccessor accessor)
        {
            _mapper = mapper;
            _context = context;
            _accessor = accessor;
        }
        public User GetCurrentUser()
        {
            string email = _accessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
            var user = _context.Users.Where(x => x.Email == email).Include(e => e.Carpools).SingleOrDefault();
            return user;
        }

        public bool SignCurrentUserToCarpool(int carpoolId)
        {
            var userToSign = GetCurrentUser();
            var carpoolToSign = _context.Carpools.Where(x => x.Id == carpoolId).Include(x => x.Users).SingleOrDefault();
            if (userToSign == null || carpoolToSign == null || carpoolToSign.Users.Count() == carpoolToSign.UsersLimit || carpoolToSign.Users.Any(x => x.Id == userToSign.Id))
                return false;
            carpoolToSign.Users.Add(userToSign);
            _context.Carpools.Update(carpoolToSign);
            userToSign.Carpools.Add(carpoolToSign);
            _context.Users.Update(userToSign);
            return _context.SaveChanges() > 0;
        }

        public bool SignOutCurrentUserFromCarpool(int carpoolId)
        {
            var userToSign = GetCurrentUser();
            var carpoolToSign = _context.Carpools.Where(x => x.Id == carpoolId).Include(x => x.Users).SingleOrDefault();
            if (userToSign == null || carpoolToSign == null)
                return false;
            carpoolToSign.Users.Remove(userToSign);
            _context.Carpools.Update(carpoolToSign);
            userToSign.Carpools.Remove(carpoolToSign);
            _context.Users.Update(userToSign);
            return _context.SaveChanges() > 0;
        }
    }
}
