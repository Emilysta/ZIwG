using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Domain.Contexts
{
    public class DataBaseContext : IdentityDbContext
    {
     
        public DataBaseContext(DbContextOptions<DataBaseContext> options)
            : base(options)
        {

        }
        new public DbSet<User> Users { get; set; }
        public DbSet<Carpool> Carpools { get; set; }
        public DbSet<Event> Events { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);
        }

    }
}