using RentIt_admin_services.DTOs;

namespace RentIt_admin_services.Servises.Interfaces
{
    public interface IAdminVehicleService
    {
        Task<List<AdminVehicleDto>> GetAllVehicles();
        Task BlockVehicle(int vehicleId);
        Task UnblockVehicle(int vehicleId);
        Task UpdateVehicleStatus(int vehicleId, string status);
    }
}
