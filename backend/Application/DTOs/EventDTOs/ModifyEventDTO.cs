using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.EventDTOs
{
    public class ModifyEventDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<TagDTO> Tags { get; set; }
        public string Place { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsPublicEvent { get; set; }
        public bool IsPaidTicket { get; set; }
        public double TicketPrice { get; set; }
        public bool IsTicketLimit { get; set; }
        public int TicketLimit { get; set; }
    }
}