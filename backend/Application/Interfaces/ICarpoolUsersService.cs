using System.Threading.Tasks;
using Application.DTOs.CarpoolDTOs;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface ICarpoolUsersService
    {
        public User GetCurrentUser();
        public bool SignCurrentUserToCarpool(int eventId);
        public bool SignOutCurrentUserFromCarpool(int eventId);
    }
}
