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
    class CarpoolConfiguration : IEntityTypeConfiguration<Carpool>
    {
        public void Configure(EntityTypeBuilder<Carpool> builder)
        {
            builder.HasKey(t => t.Id);

            builder.Property(t => t.UsersLimit)
                .IsRequired();
            builder.Property(t => t.StartDate)
                .IsRequired();
            builder.Property(t => t.FinishDate)
                .IsRequired();
            builder.Property(t => t.Origin)
                .IsRequired()
                .HasMaxLength(60);
            builder.Property(t => t.Destination)
                .IsRequired()
                .HasMaxLength(60);
            builder.Property(t => t.Description)
                .IsRequired()
                .HasMaxLength(200);
            builder.Property(t => t.DriverId)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(t => t.TotalCost)
                .IsRequired().HasColumnType("decimal(18,4)");
        }
    }
}