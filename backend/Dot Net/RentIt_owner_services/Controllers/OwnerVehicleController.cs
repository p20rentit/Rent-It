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
