using RentIt_owner_services.Models;

namespace RentIt_owner_services.Repositories.Interfaces
{
    public interface IOwnerVehicleRepository
    {
        Task<List<Vehicle>> GetVehiclesByOwnerId(int ownerId);

        // Get single vehicle by ID for update
        Task<Vehicle?> GetVehicleById(int vehicleId);

        // add vehicle
        Task AddVehicle(Vehicle vehicle);

        Task SaveChanges();

        // add image
        Task AddVehicleImage(VehicleImage image);
        Task ResetPrimaryImages(int vehicleId);

    }
}
