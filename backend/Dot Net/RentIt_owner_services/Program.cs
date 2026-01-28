
using Microsoft.EntityFrameworkCore;
using RentIt_owner_services.Models;
using RentIt_owner_services.Repositories;
using RentIt_owner_services.Repositories.Interfaces;
using RentIt_owner_services.Services;
using RentIt_owner_services.Services.Interfaces;

namespace RentIt_owner_services
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            // CORS Configuration - Allow frontend to make requests
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                {
                    policy.WithOrigins("http://localhost:5173") // React frontend URL
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
            });

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // ✅ DbContext registration (THIS IS THE KEY)
            builder.Services.AddDbContext<P20RentitContext>(options =>
            {
                options.UseMySql(
                    builder.Configuration.GetConnectionString("DefaultConnection"),
                    ServerVersion.AutoDetect(
                        builder.Configuration.GetConnectionString("DefaultConnection")
                    )
                );
            });

            // ======================================
            // Repository + Service Registration
            // ======================================
            
            // Owner Vehicle Service (existing)
            builder.Services.AddScoped<IOwnerVehicleRepository, OwnerVehicleRepository>();
            builder.Services.AddScoped<IOwnerVehicleService, OwnerVehicleService>();

            // VehicleType Service - for vehicle type dropdown
            builder.Services.AddScoped<IVehicleTypeRepository, VehicleTypeRepository>();
            builder.Services.AddScoped<IVehicleTypeService, VehicleTypeService>();

            // Brand Service - for brand dropdown
            builder.Services.AddScoped<IBrandRepository, BrandRepository>();
            builder.Services.AddScoped<IBrandService, BrandService>();

            // Model Service - for model dependent dropdown
            builder.Services.AddScoped<IModelRepository, ModelRepository>();
            builder.Services.AddScoped<IModelService, ModelService>();

            // FuelType Service - for fuel type dropdown
            builder.Services.AddScoped<IFuelTypeRepository, FuelTypeRepository>();
            builder.Services.AddScoped<IFuelTypeService, FuelTypeService>();


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // ❌ Commented out - Causes CORS issues with HTTP frontend (localhost:5173)
            // app.UseHttpsRedirection();

            // Enable CORS
            app.UseCors("AllowFrontend");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
