using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class Image
    {
        public int Id { get; set; }
        public byte[] ImageBytes { get; set; }
    }
}
