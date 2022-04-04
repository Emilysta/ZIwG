using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Domain.Configurations
{
    class EventConfiguration : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
        {
            builder.HasKey(t => t.Id);

            builder.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(40);
            builder.Property(t => t.Description)
                .IsRequired()
                .HasMaxLength(200);
            builder.Property(t => t.Category)
                .IsRequired()
                .HasMaxLength(10);
            builder.Property(t => t.Place)
                .IsRequired()
                .HasMaxLength(60);
            builder.Property(t => t.UsersLimit)
                .IsRequired();
            builder.Property(t => t.Date)
                .IsRequired();
            builder.Property(t => t.OrganiserId)
                .IsRequired()
                .HasMaxLength(100);
        }
    }
}