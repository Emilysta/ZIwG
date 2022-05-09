using System.Threading.Tasks;
using Application.DTOs.UserDTOs;
using Microsoft.AspNetCore.Authentication;

namespace Application.Interfaces
{
    public interface ILoggingService
    {
        public Task<bool> Register(RegisterDTO model);
        public Task<bool> Login(LoginDTO model);
        public Task<bool> GetGoogleResponse();
        public AuthenticationProperties LoginWithGoogle(string redirectUrl);
        public Task<bool> Logout();
        public Task<bool> SaveChangesAsync();
    }
}
