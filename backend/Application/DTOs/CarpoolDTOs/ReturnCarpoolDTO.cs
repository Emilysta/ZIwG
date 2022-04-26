using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.CarpoolDTOs
{
    public class ReturnCarpoolDTO
    {
        public int UsersLimit { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public string Description { get; set; }
        public decimal TotalCost { get; set; }
        public string DriverId { get; set; }
    }
}
