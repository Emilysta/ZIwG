using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.EventDTOs
{
    public class ReturnEventsAsListDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public byte[] MainImage { get; set; }
        public string OrganiserName { get; set; }
        public byte[] OrganiserImage { get; set; }
    }
}
