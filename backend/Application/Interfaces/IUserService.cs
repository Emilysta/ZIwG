using System.Threading.Tasks;
using Application.DTOs.UserDTOs;

namespace Application.Interfaces
{
    public interface IUserService
    {
        public bool ChangeDisplayName(DisplayNameDTO model, string id);
        public Task<bool> SaveChangesAsync();
    }
}
