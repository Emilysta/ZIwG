using Application.DTOs.UserDTOs;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserService
    {
        public bool ChangeDisplayName(DisplayNameDTO model, string id);
        public Task<bool> SaveChangesAsync();
    }
}
