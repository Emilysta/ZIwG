using System.Threading.Tasks;
using Application.DTOs.UserDTOs;

namespace Application.Interfaces
{
    public interface IUserService
    {
        public bool ChangeDisplayData(DisplayDataDTO model, string id);
        public Task<bool> SaveChangesAsync();
    }
}
