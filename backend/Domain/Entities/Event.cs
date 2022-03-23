using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Place { get; set; }
        public DateTime Date { get; set; }
        public int UsersLimit { get; set; }
        public List<User> Users { get; set; }
        public User Organiser { get; set; }
    }
}
