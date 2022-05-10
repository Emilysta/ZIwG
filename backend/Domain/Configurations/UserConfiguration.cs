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
            builder.Property(t => t.Description)
                .HasMaxLength(150);
            builder.Property(t => t.Location)
                .HasMaxLength(25);

            builder.HasMany(u => u.ParticipatedEvents)
                .WithMany(t => t.Users);
            builder.HasMany(u => u.OrganisedEvents)
                .WithOne(t => t.Organiser);
            builder.HasMany(u => u.Carpools)
                .WithMany(t => t.Users);
        }
    }
}
