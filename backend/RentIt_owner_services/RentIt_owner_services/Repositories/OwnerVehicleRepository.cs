using Microsoft.EntityFrameworkCore;
using RentIt_owner_services.Models;
using RentIt_owner_services.Repositories.Interfaces;

namespace RentIt_owner_services.Repositories
{
    public class OwnerVehicleRepository : IOwnerVehicleRepository
    {


        private readonly P20RentitContext _context;

        public OwnerVehicleRepository(P20RentitContext context)
        {
            _context = context;
        }

        public async Task<List<Vehicle>> GetVehiclesByOwnerId(int ownerId)
        {
            return await _context.Vehicles
                .Where(v => v.OwnerId == ownerId)
                .Include(v => v.VehicleType)
                .Include(v => v.FuelType)
                .Include(v => v.Model)
                    .ThenInclude(m => m.Brand)
                .Include(v => v.VehicleImages)
                .ToListAsync();
        }

        // Get single vehicle by ID for update operations
        public async Task<Vehicle?> GetVehicleById(int vehicleId)
        {
            return await _context.Vehicles
                .FirstOrDefaultAsync(v => v.VehicleId == vehicleId);
        }

        // Add a new vehicle
        public async Task AddVehicle(Vehicle vehicle)
        {
            await _context.Vehicles.AddAsync(vehicle);
        }


        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }


        // add image
        public async Task AddVehicleImage(VehicleImage image)
        {
            await _context.VehicleImages.AddAsync(image);
        }

        public async Task ResetPrimaryImages(int vehicleId)
        {
            var images = await _context.VehicleImages
                .Where(i => i.VehicleId == vehicleId)
                .ToListAsync();

            foreach (var img in images)
                img.IsPrimary = 0;
        }

    }
}
