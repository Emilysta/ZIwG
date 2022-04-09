using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.EventDTOs
{
    public class ReturnDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Place { get; set; }
        public DateTime Date { get; set; }
        public int UsersLimit { get; set; }
        public string OrganiserId { get; set; }
    }
}
