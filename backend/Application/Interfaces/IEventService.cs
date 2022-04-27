using System.Threading.Tasks;
using Application.DTOs.EventDTOs;
using System;
using System.Collections.Generic;
namespace Application.Interfaces
{
    public interface IEventService
    {
        public Task<bool> AddEvent(CreateDTO @event);
        public bool DeleteEvent(int id);
        public bool ModifyEvent(ModifyDTO @event, int id);
        public Task<List<ReturnDTO>> GetEvents(string Location, string MonthAndYear, string Userid);
        public Task<bool> SaveChangesAsync();
    }
}
