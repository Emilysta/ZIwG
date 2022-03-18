using Application.DTOs.UserDTOs;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ILoggingService
    {
        public Task<bool> Register(RegisterDTO model);
    }
}
