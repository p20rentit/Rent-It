using RentIt_admin_services.Models;

namespace RentIt_admin_services.Repositories.Interfaces
{
    public interface IAdminVehicleRepository
    {
        Task<List<Vehicle>> GetAllVehicles();
        Task<Vehicle?> GetVehicleById(int vehicleId);
        Task SaveChanges();
    }
}
