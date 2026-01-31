using Microsoft.EntityFrameworkCore;
using RentIt_admin_services.Models;
using RentIt_admin_services.Repositories;
using RentIt_admin_services.Repositories.Interfaces;
using RentIt_admin_services.Servises;
using RentIt_admin_services.Servises.Interfaces;
using System.Text.Json.Serialization;
using Steeltoe.Discovery.Client;   // Enables .NET service registration with Eureka

namespace RentIt_admin_services
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Register service with Eureka Server
            builder.Services.AddDiscoveryClient(builder.Configuration);

            // Allow frontend (React) to call this API
            //builder.Services.AddCors(options =>
            //{
            //    options.AddPolicy("AllowFrontend", policy =>
            //    {
            //        policy.WithOrigins("http://localhost:5173")
            //              .AllowAnyHeader()
            //              .AllowAnyMethod()
            //              .AllowCredentials();
            //    });
            //});

            // Add controller support
            builder.Services.AddControllers();

            // Enable Swagger (API documentation)
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Prevent JSON cyclic reference errors
            builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

            // Configure MySQL database connection
            builder.Services.AddDbContext<P20RentitContext>(options =>
            {
                options.UseMySql(
                    builder.Configuration.GetConnectionString("DefaultConnection"),
                    ServerVersion.AutoDetect(
                        builder.Configuration.GetConnectionString("DefaultConnection")
                    )
                );
            });

            // Register Repository and Service (Dependency Injection)
            builder.Services.AddScoped<IAdminUserRepository, AdminUserRepository>();
            builder.Services.AddScoped<IAdminUserService, AdminUserService>();

            builder.Services.AddScoped<IAdminVehicleRepository, AdminVehicleRepository>();
            builder.Services.AddScoped<IAdminVehicleService, AdminVehicleService>();

            var app = builder.Build();

            // Enable Swagger only in development mode
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // HTTPS disabled (Eureka works better with HTTP)
            // app.UseHttpsRedirection();

            // Enable CORS
            app.UseCors("AllowFrontend");

            // Enable authorization middleware
            app.UseAuthorization();

            // Map controller routes
            app.MapControllers();

            // Connect service to Eureka server
            app.UseDiscoveryClient();

            app.Run();
        }
    }
}
