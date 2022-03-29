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
            var user = new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                DisplayName = model.DisplayName,
                Email = model.Email,
                UserName= model.Email,
                DateOfBirth = model.DateOfBirth,
            };

            var createAccountResult = await _userManager.CreateAsync(user, model.Password);
            if (createAccountResult.Succeeded)
                return true;
            return false;
        }
    }
}
