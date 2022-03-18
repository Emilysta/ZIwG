using Microsoft.AspNetCore.Identity;
using Application.Interfaces;
using Domain.Entities;
using System.Threading.Tasks;
using Application.DTOs.UserDTOs;

namespace Infrastructure.Services
{
    public class LoggingService : ILoggingService
    {
        private readonly UserManager<User> _userManager;

        public LoggingService(UserManager<User> userManager)
        {
            _userManager = userManager;
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
                Email = model.Email,
                UserName = model.Email,
                DateOfBirth = model.DateOfBirth,
            };

            var createAccountResult = await _userManager.CreateAsync(user, model.Password);
            if (createAccountResult.Succeeded)
                return true;
            return false;
        }
    }
}
