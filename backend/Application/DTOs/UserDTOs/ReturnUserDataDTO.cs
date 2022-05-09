using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class ReturnUserDataDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public byte[] Photo { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
