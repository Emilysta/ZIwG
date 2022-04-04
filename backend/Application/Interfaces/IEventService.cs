using System.Threading.Tasks;
using Application.DTOs.EventDTOs;

namespace Application.Interfaces
{
    public interface IEventService
    {
        public Task<bool> AddEvent(CreateDTO @event);
        public Task<bool> SaveChangesAsync();
    }
}
