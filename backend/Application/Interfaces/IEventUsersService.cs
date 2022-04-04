using System.Threading.Tasks;
using Application.DTOs.EventDTOs;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IEventUsersService
    {
        public User GetCurrentUser();
    }
}
