using System.Threading.Tasks;
using Application.DTOs.UserDTOs;
using Domain.Entities;
using Microsoft.AspNetCore.Authentication;

namespace Application.Interfaces
{
    public interface ILoggingService
    {
        public Task<bool> Register(RegisterDTO model);
        public Task<User> Login(LoginDTO model);
        public Task<bool> GetGoogleResponse();
        public AuthenticationProperties LoginWithGoogle(string redirectUrl);
        public Task<bool> Logout();
        public Task<bool> ResetPassword(ReserPasswordDTO resetPasswordDTO);
        public Task<bool> SendPasswordRecoveryEmail(string userEmail);
        public Task<bool> SaveChangesAsync();
    }
}
