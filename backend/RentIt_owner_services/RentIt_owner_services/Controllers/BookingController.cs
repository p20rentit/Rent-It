using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RentIt_owner_services.Services.Interfaces;

namespace RentIt_owner_services.Controllers
{
    [ApiController]
    [Route("owner/bookings")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet("{ownerId}")]
        public async Task<IActionResult> GetOwnerBookings(int ownerId)
        {
            var bookings = await _bookingService.GetBookingsByOwnerId(ownerId);
            return Ok(bookings);
        }
    }
}
