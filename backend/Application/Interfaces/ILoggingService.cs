using Application.DTOs.UserDTOs;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ILoggingService
    {
        public Task<bool> Register(RegisterDTO model);
        public Task<bool> Login(LoginDTO model);
        public bool Modify(ModifyDTO @model, string id);
        public Task<bool> SaveChangesAsync();

    }
}
