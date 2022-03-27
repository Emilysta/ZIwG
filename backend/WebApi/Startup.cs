using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Domain.Entities;
using Domain.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Application.Interfaces;
using Domain.Contexts;
using Domain.Entities;
using Infrastructure.MappingProfiles;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Infrastructure.Services;

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
            
            services.AddControllers();

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
            })
                .AddCookie(options =>
                {
                    options.LoginPath = "/api/user/google-login";
                })
                .AddGoogle(options =>
                {
                    options.ClientId = "827727851412-6rvoiprug86jmva1t1q37s8jva6pit4h.apps.googleusercontent.com";
                    options.ClientSecret = "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";
                    options.ClaimActions.MapJsonKey("urn:google:picture", "picture", "url");
                });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "swagger ziwg api", Version = "v1" });
            });

            services.AddDbContext<DataBaseContext>(options =>
            {
                if (Environment.IsDevelopment())
                    options.UseSqlServer(Configuration["Connectionstrings:DefaultConnection"]);
                else
                    options.UseMySQL(Configuration["MySQL"]);
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
            app.UseHttpsRedirection();
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
