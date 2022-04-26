using System.Threading.Tasks;
using Application.DTOs.CarpoolDTOs;
using System;
using System.Collections.Generic;
namespace Application.Interfaces
{
    public interface ICarpoolService
    {
        public Task<bool> AddEvent(CreateCarpoolDTO carpool);
        public bool DeleteCarpool(int c);
        public bool ModifyCarpool(ModifyCarpoolDTO carpool, int id);
        public Task<List<ReturnCarpoolDTO>> GetCarpools(string MonthAndYear, string Userid);
        public Task<bool> SaveChangesAsync();
    }
}
