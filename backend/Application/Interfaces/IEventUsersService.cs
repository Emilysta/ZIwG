using System.Threading.Tasks;
using Application.DTOs.EventDTOs;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IEventUsersService
    {
        public User GetCurrentUser();
        public bool SignCurrentUserToEvent(int eventId);
        public bool SignOutCurrentUserFromEvent(int eventId);
        public byte[] GeneratePDF(int eventId);
    }
}
