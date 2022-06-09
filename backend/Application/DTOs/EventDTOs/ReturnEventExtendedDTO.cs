using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.EventDTOs
{
    public class ReturnEventExtendedDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Place { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public byte[] MainImage { get; set; }
        public string OrganiserName { get; set; }
        public string OrganiserId { get; set; }
        public byte[] OrganiserImage { get; set; }
        public bool IsPublicEvent { get; set; }
        public bool IsTicketLimit { get; set; }
        public int TicketLimit { get; set; }
        public List<TagDTO> Tags { get; set; }
        public List<Image> Images { get; set; }
        public int Signed { get; set; }
        public int Available { get; set; }
        
    }
}
