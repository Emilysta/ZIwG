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
            builder.Property(t => t.Place)
                .IsRequired()
                .HasMaxLength(60);
            builder.Property(t => t.IsPaidTicket)
                .IsRequired();
            builder.Property(t => t.IsPublicEvent)
                .IsRequired();
            builder.Property(t => t.StartDate)
                .IsRequired();
            builder.Property(t => t.EndDate)
                .IsRequired();

            builder.HasMany(u => u.Users)
                .WithMany(t => t.ParticipatedEvents);
            builder.HasOne(u => u.Organiser)
                .WithMany(t => t.OrganisedEvents);
            builder.HasMany(u => u.Images);
            builder.HasMany(u => u.Tags);
        }
    }
}