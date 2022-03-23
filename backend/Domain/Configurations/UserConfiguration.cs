using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Domain.Configurations
{
    class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(t => t.FirstName)
                .IsRequired()
                .HasMaxLength(15); 
            builder.Property(t => t.LastName)
                .IsRequired()
                .HasMaxLength(30); 
            builder.Property(t => t.DateOfBirth)
                .IsRequired();
            builder.Property(t => t.Email)
                .IsRequired().HasMaxLength(50);
            builder.Property(t => t.PhoneNumber)
                .HasMaxLength(14);
            builder.Property(t => t.DisplayName)
                .IsRequired()
                .HasMaxLength(25);
            
        }
    }
}
