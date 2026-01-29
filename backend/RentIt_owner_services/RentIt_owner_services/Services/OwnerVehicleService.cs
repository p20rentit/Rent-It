using RentIt_owner_services.Models;
using RentIt_owner_services.Repositories.Interfaces;
using RentIt_owner_services.Services.Interfaces;
using RentIt_owner_services.DTOs;
namespace RentIt_owner_services.Services
{
    public class OwnerVehicleService : IOwnerVehicleService
    {
        private readonly IOwnerVehicleRepository _repository;

        public OwnerVehicleService(IOwnerVehicleRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<OwnerVehicleDto>> FetchOwnerVehicles(int ownerId)
        {
            var vehicles = await _repository.GetVehiclesByOwnerId(ownerId);

            return vehicles.Select(v =>
            {
                var primaryImage = v.VehicleImages
                    .FirstOrDefault(i => i.IsPrimary == 1);

                return new OwnerVehicleDto
                {
                    VehicleId = v.VehicleId,
                    VehicleTypeName = v.VehicleType.VehicleTypeName,
                    FuelTypeName = v.FuelType != null ? v.FuelType.FuelType1 : null,
                    Ac = v.Ac,
                    Status = v.Status,
                    VehicleNumber = v.VehicleNumber,
                    VehicleRcNumber = v.VehicleRcNumber,
                    Description = v.Description,
                    ModelName = v.Model.Model1,
                    BrandName = v.Model.Brand.Brand1,
                    IsPrimaryImage = primaryImage != null,
                    Image = primaryImage?.Image
                };
            }).ToList();
        }


        public async Task<int> AddVehicle(AddVehicleRequest request, int ownerId)
        {
            var vehicle = new Vehicle
            {
                OwnerId = ownerId,
                VehicleTypeId = request.VehicleTypeId,
                ModelId = request.ModelId,
                FuelTypeId = request.FuelTypeId,
                VehicleNumber = request.VehicleNumber,
                VehicleRcNumber = request.VehicleRcNumber,
                Ac = request.Ac,
                Description = request.Description,
                Status = "ACTIVE"
            };

            await _repository.AddVehicle(vehicle);
            await _repository.SaveChanges();

            return vehicle.VehicleId;
        }

        // Update existing vehicle information
        public async Task UpdateVehicle(int vehicleId, AddVehicleRequest request)
        {
            var vehicle = await _repository.GetVehicleById(vehicleId);
            
            if (vehicle == null)
                throw new Exception("Vehicle not found");

            // Update vehicle properties
            vehicle.VehicleTypeId = request.VehicleTypeId;
            vehicle.ModelId = request.ModelId;
            vehicle.FuelTypeId = request.FuelTypeId;
            vehicle.VehicleNumber = request.VehicleNumber;
            vehicle.VehicleRcNumber = request.VehicleRcNumber;
            vehicle.Ac = request.Ac;
            vehicle.Description = request.Description;

            await _repository.SaveChanges();
        }

        public async Task AddVehicleImage(AddVehicleImageRequest request)
        {
            // 🛡️ 1. Validate file existence
            if (request.Image == null || request.Image.Length == 0)
                throw new Exception("Image file is required");

            // 🛡️ 2. Validate size (max 5 MB)
            if (request.Image.Length > 5 * 1024 * 1024)
                throw new Exception("Image size must be less than 5MB");

            // 🛡️ 3. Validate type
            if (!request.Image.ContentType.StartsWith("image/"))
                throw new Exception("Only image files are allowed");

            byte[] imageBytes;

            // 📦 4. Convert to byte[]
            using (var ms = new MemoryStream())
            {
                await request.Image.CopyToAsync(ms);
                imageBytes = ms.ToArray();
            }

            // ⭐ 5. Handle primary image logic
            if (request.IsPrimary)
                await _repository.ResetPrimaryImages(request.VehicleId);

            // 💾 6. Save entity
            var vehicleImage = new VehicleImage
            {
                VehicleId = request.VehicleId,
                Image = imageBytes,
                IsPrimary = (sbyte)(request.IsPrimary ? 1 : 0)
            };

            await _repository.AddVehicleImage(vehicleImage);
            await _repository.SaveChanges();
        }

    }
}
