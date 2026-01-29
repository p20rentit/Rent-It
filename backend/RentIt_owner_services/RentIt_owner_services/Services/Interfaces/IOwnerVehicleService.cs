using RentIt_owner_services.DTOs;
using RentIt_owner_services.Models;
using System.Runtime.CompilerServices;

namespace RentIt_owner_services.Services.Interfaces
{
    public interface IOwnerVehicleService
    {

        Task<List<OwnerVehicleDto>> FetchOwnerVehicles(int ownerId);

        Task<int> AddVehicle(AddVehicleRequest request, int ownerId);

        // Update existing vehicle
        Task UpdateVehicle(int vehicleId, AddVehicleRequest request);

        Task AddVehicleImage(AddVehicleImageRequest request);

    }
}
