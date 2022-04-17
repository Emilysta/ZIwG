using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Application.Interfaces;
using Infrastructure.MappingProfiles;
using Domain.Contexts;
using Domain.Entities;
using Infrastructure.Services;
using System.Reflection;
using System.IO;
using System;

namespace ziwg
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Environment = env;
            Configuration = configuration;
        }

        public IWebHostEnvironment Environment { get; private set; }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(UserMappingProfile));
            services.AddTransient<ILoggingService, LoggingService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IEventService, EventService>();
            services.AddTransient<IEventUsersService, EventUsersService>();
            services.AddControllers();

            services.AddAuthentication()
                .AddGoogle(options =>
                {
                    options.ClientId = "827727851412-fbdd0d3f7a1mqga5e3d4muhml20m7ftr.apps.googleusercontent.com";
                    options.ClientSecret = "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";
                    options.ClaimActions.MapJsonKey("urn:google:picture", "picture", "url");
                    options.SignInScheme = IdentityConstants.ExternalScheme;
                });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "swagger ziwg api", Version = "v1" });
                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
            

            services.AddDbContext<DataBaseContext>(options =>
            {
                if (Environment.IsDevelopment())
                    options.UseSqlServer(Configuration["Connectionstrings:DefaultConnection"]);
                else
                    options.UseMySQL(Configuration["MySQL"]);
            });

            services.AddIdentity<User, IdentityRole>()
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
            app.UseHttpsRedirection();
            app.UseCookiePolicy();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
