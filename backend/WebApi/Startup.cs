using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Domain.Entities;
using Domain.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using Application.Interfaces;
using Infrastructure.Services;
using Infrastructure.MappingProfiles;

namespace ziwg
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(UserMappingProfile));
            services.AddTransient<ILoggingService, LoggingService>();
            

            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "swagger ziwg api", Version = "v1" });
            });

            services.AddDbContext<DataBaseContext>(options =>
            {
              options.UseSqlServer(Configuration["Connectionstrings:DefaultConnection"]);
            });

            services.AddIdentityCore<User>()
             .AddEntityFrameworkStores<DataBaseContext>();

        }

// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ziwg"));

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
