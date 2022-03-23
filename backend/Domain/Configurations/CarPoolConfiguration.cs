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
    class CarPoolConfiguration : IEntityTypeConfiguration<CarPool>
    {
        public void Configure(EntityTypeBuilder<CarPool> builder)
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
            builder.HasOne(u => u.Driver)
            .WithMany(t => t.CarPools);
            builder.Property(t => t.TotalCost)
                .IsRequired().HasColumnType("decimal(18,4)");
        }
    }
}