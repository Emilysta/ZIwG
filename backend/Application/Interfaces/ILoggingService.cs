using Microsoft.AspNetCore.Authentication;
using System.Threading.Tasks;
using Application.DTOs.UserDTOs;

namespace Application.Interfaces
{
    public interface ILoggingService
    {
        public Task<bool> Register(RegisterDTO model);
        public Task<bool> Login(LoginDTO model);
        public Task<bool> RegisterWithGoogle(AuthenticateResult result);
        public Task<bool> SaveChangesAsync();
    }
}
