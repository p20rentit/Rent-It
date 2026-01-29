using RentIt_admin_services.DTOs;
using RentIt_admin_services.Repositories.Interfaces;
using RentIt_admin_services.Servises.Interfaces;

namespace RentIt_admin_services.Servises
{
    public class AdminVehicleService : IAdminVehicleService
    {
        private readonly IAdminVehicleRepository _repository;

        public AdminVehicleService(IAdminVehicleRepository repository)
        {
            _repository = repository;
        }

        // Get all vehicles with owner details
        public async Task<List<AdminVehicleDto>> GetAllVehicles()
        {
            var vehicles = await _repository.GetAllVehicles();

            return vehicles.Select(v =>
            {
                var primaryImage = v.VehicleImages
                    .FirstOrDefault(i => i.IsPrimary == 1);

                // Build owner full name
                var ownerName = $"{v.Owner.Fname} {v.Owner.Mname} {v.Owner.Lname}".Trim();

                return new AdminVehicleDto
                {
                    VehicleId = v.VehicleId,
                    OwnerName = ownerName,
                    OwnerEmail = v.Owner.Email,
                    OwnerPhone = v.Owner.Phone,
                    VehicleTypeName = v.VehicleType.VehicleTypeName,
                    BrandName = v.Model?.Brand?.Brand1,
                    ModelName = v.Model?.Model1,
                    FuelTypeName = v.FuelType?.FuelType1,
                    Ac = v.Ac,
                    Status = v.Status,
                    VehicleNumber = v.VehicleNumber,
                    VehicleRcNumber = v.VehicleRcNumber,
                    Description = v.Description,
                    IsPrimaryImage = primaryImage != null,
                    Image = primaryImage?.Image
                };
            }).ToList();
        }

        // Block a vehicle
        public async Task BlockVehicle(int vehicleId)
        {
            await UpdateVehicleStatus(vehicleId, "BLOCKED");
        }

        // Unblock a vehicle
        public async Task UnblockVehicle(int vehicleId)
        {
            await UpdateVehicleStatus(vehicleId, "ACTIVE");
        }

        // Update vehicle status (generic method)
        public async Task UpdateVehicleStatus(int vehicleId, string status)
        {
            var vehicle = await _repository.GetVehicleById(vehicleId);

            if (vehicle == null)
                throw new Exception($"Vehicle with ID {vehicleId} not found");

            // Validate status
            var validStatuses = new[] { "ACTIVE", "BLOCKED" };
            if (!validStatuses.Contains(status.ToUpper()))
                throw new Exception($"Invalid status. Valid values are: {string.Join(", ", validStatuses)}");

            vehicle.Status = status.ToUpper();
            await _repository.SaveChanges();
        }
    }
}
