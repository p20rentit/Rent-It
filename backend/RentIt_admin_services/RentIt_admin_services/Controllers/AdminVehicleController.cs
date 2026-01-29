using Microsoft.AspNetCore.Mvc;
using RentIt_admin_services.DTOs;
using RentIt_admin_services.Servises.Interfaces;

namespace RentIt_admin_services.Controllers
{
    [ApiController]
    [Route("api/admin/vehicles")]
    public class AdminVehicleController : Controller
    {
        private readonly IAdminVehicleService _adminVehicleService;

        public AdminVehicleController(IAdminVehicleService adminVehicleService)
        {
            _adminVehicleService = adminVehicleService;
        }

        // GET: api/admin/vehicles
        // Get all vehicles with owner details
        [HttpGet]
        public async Task<IActionResult> GetAllVehicles()
        {
            var vehicles = await _adminVehicleService.GetAllVehicles();
            return Ok(vehicles);
        }

        // PUT: api/admin/vehicles/{vehicleId}/block
        // Block a specific vehicle
        [HttpPut("{vehicleId}/block")]
        public async Task<IActionResult> BlockVehicle(int vehicleId)
        {
            try
            {
                await _adminVehicleService.BlockVehicle(vehicleId);
                return Ok(new
                {
                    message = "Vehicle blocked successfully",
                    vehicleId,
                    status = "BLOCKED"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // PUT: api/admin/vehicles/{vehicleId}/unblock
        // Unblock a specific vehicle
        [HttpPut("{vehicleId}/unblock")]
        public async Task<IActionResult> UnblockVehicle(int vehicleId)
        {
            try
            {
                await _adminVehicleService.UnblockVehicle(vehicleId);
                return Ok(new
                {
                    message = "Vehicle unblocked successfully",
                    vehicleId,
                    status = "ACTIVE"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // PUT: api/admin/vehicles/{vehicleId}/status
        // Generic endpoint to update vehicle status
        [HttpPut("{vehicleId}/status")]
        public async Task<IActionResult> UpdateVehicleStatus(
            int vehicleId,
            [FromBody] UpdateVehicleStatusRequest request)
        {
            try
            {
                await _adminVehicleService.UpdateVehicleStatus(vehicleId, request.Status);
                return Ok(new
                {
                    message = "Vehicle status updated successfully",
                    vehicleId,
                    status = request.Status
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
