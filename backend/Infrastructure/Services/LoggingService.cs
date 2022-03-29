﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication;
using System.Linq;
using AutoMapper;
using Application.Interfaces;
using Application.DTOs.UserDTOs;
using Domain.Entities;
using Domain.Contexts;

namespace Infrastructure.Services
{
    public class LoggingService : ILoggingService
    {
        private readonly DataBaseContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public LoggingService(UserManager<User> userManager, IMapper mapper, DataBaseContext context)
        {
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
        }
        public async Task<bool> Login(LoginDTO model)
        {
            var user = await _userManager.FindByNameAsync(model.Email);

            if (user != null)
            {
                var signInResult = await _userManager.CheckPasswordAsync(user, model.Password);
                return signInResult;
            }
            return false;
        }

        public async Task<bool> Register(RegisterDTO model)
        {
            var userToRegister = new User {
                UserName = model.Email
            };
            userToRegister = _mapper.Map(model, userToRegister);

            var createAccountResult = await _userManager.CreateAsync(userToRegister, model.Password);
            if (createAccountResult.Succeeded)
                return true;
            return false;
        }

        public async Task<bool> RegisterWithGoogle(AuthenticateResult result)
        {
            var claims = result.Principal.Identities.FirstOrDefault()
                .Claims.Select(claim => new
                {
                    claim.Issuer,
                    claim.OriginalIssuer,
                    claim.Type,
                    claim.Value
                });

            var email = claims.ElementAt(4).Value;
            var checkUser = _context.Users.Where(x => x.Email == email).SingleOrDefault();
            if (checkUser == null)
            {
                var usertoadd = new User
                {
                    DisplayName = claims.ElementAt(1).Value,
                    FirstName = claims.ElementAt(2).Value,
                    LastName = claims.ElementAt(3).Value,
                    UserName = email,
                    Email = email
                };
                await _context.Users.AddAsync(usertoadd);
                return true;
            }
            return false;
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
