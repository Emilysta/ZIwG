using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class CarPool
    {
        public int Id { get; set; }
        public int UsersLimit { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public List<User> Users { get; set; }
        public string Description { get; set; }
        public decimal TotalCost { get; set; }
        public string DriverId { get; set; }

    }
}
