using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class TicketDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }

        public string OrganiserName { get; set; }
        public string OrganiserEmail { get; set; }

        public string EventName { get; set; }
        public string Place { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsPaidTicket { get; set; }
        public double TicketPrice { get; set; }
    }
}
