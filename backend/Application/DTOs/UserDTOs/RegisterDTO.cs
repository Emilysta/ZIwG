﻿using System;
using System.Collections.Generic;
using System.Linq;
namespace Application.DTOs.UserDTOs
{
    public class RegisterDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }

    }
}
