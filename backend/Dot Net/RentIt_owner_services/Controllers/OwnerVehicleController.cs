using Microsoft.AspNetCore.Mvc;
using RentIt_owner_services.DTOs;
using RentIt_owner_services.Models;
using RentIt_owner_services.Services.Interfaces;

namespace RentIt_owner_services.Controllers
{
    [ApiController]
    [Route("api/owner/vehicles")]
    public class OwnerVehicleController : Controller
    {
        private readonly IOwnerVehicleService _ownerVehicleService;

        public OwnerVehicleController(IOwnerVehicleService ownerVehicleService)
        {
            _ownerVehicleService = ownerVehicleService;
        }

        // GET: api/owner/vehicles/{ownerId}
        [HttpGet("{ownerId}")]
        public async Task<IActionResult> FetchOwnerVehicles(int ownerId)
        {
            var result = await _ownerVehicleService.FetchOwnerVehicles(ownerId);
            return Ok(result);
        }

        // POST: api/owner/vehicles/{ownerId}
        [HttpPost("{ownerId}")]
        public async Task<IActionResult> AddVehicle(
            int ownerId,
            [FromBody] AddVehicleRequest request)
        {
            var vehicleId = await _ownerVehicleService.AddVehicle(request, ownerId);

            return Ok(new
            {
                message = "Vehicle added successfully",
                vehicleId
            });
        }

        // PUT: api/owner/vehicles/{vehicleId}
        // Update existing vehicle information
        [HttpPut("{vehicleId}")]
        public async Task<IActionResult> UpdateVehicle(
            int vehicleId,
            [FromBody] AddVehicleRequest request)
        {
            // Note: Reusing AddVehicleRequest DTO for update
            // You can create a separate UpdateVehicleRequest if different fields needed
            await _ownerVehicleService.UpdateVehicle(vehicleId, request);

            return Ok(new
            {
                message = "Vehicle updated successfully"
            });
        }

        // POST: api/owner/vehicles/upload-image
        // Upload vehicle image (primary or additional)
        [HttpPost("upload-image")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadVehicleImage(
            [FromForm] AddVehicleImageRequest request)
        {
            await _ownerVehicleService.AddVehicleImage(request);

            return Ok(new
            {
                message = "Vehicle image uploaded successfully"
            });
        }

    }
}
