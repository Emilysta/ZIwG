﻿using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[] MainImage { get; set; }
        public List<Tag> Tags { get; set; }
        public List<Image> Images { get; set; }
        public string Place { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsPublicEvent { get; set; }
        public bool IsPaidTicket { get; set; }
        public double TicketPrice { get; set; }
        public bool IsTicketLimit { get; set; }
        public int TicketLimit { get; set; }
        public List<User> Users { get; set; }
        public User Organiser { get; set; }
    }
}
