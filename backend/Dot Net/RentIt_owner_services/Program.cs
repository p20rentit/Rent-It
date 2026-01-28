
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

            // Repository + Service
            builder.Services.AddScoped<IOwnerVehicleRepository, OwnerVehicleRepository>();
            builder.Services.AddScoped<IOwnerVehicleService, OwnerVehicleService>();


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
