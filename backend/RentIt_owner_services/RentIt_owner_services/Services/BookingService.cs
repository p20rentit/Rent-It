using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RentIt_owner_services.DTOs;
using RentIt_owner_services.Models;
using RentIt_owner_services.Services.Interfaces;

namespace RentIt_owner_services.Services
{
    public class BookingService : IBookingService
    {
        private readonly P20RentitContext _context;

        public BookingService(P20RentitContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OwnerBookingDTO>> GetBookingsByOwnerId(int ownerId)
        {
            var bookings = await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Vehicle)
                    .ThenInclude(v => v.Model)
                        .ThenInclude(m => m.Brand)
                .Where(b => b.Vehicle.OwnerId == ownerId)
                .OrderByDescending(b => b.BookingDate)
                .Select(b => new OwnerBookingDTO
                {
                    BookingId = b.BookingId,
                    VehicleId = b.VehicleId,
                    VehicleName = $"{b.Vehicle.Model.Brand.Brand1} {b.Vehicle.Model.Model1}",
                    VehicleNumber = b.Vehicle.VehicleNumber ?? "N/A",
                    CustomerName = $"{b.User.Fname} {b.User.Lname}",
                    CustomerPhone = b.User.Phone ?? "N/A",
                    BookingDate = b.BookingDate,
                    StartingDate = b.StartingDate,
                    EndDate = b.EndDate,
                    PickupTime = b.PickupTime,
                    ReturnTime = b.ReturnTime,
                    TotalAmount = b.TotalAmount,
                    PaidAmount = b.PaidAmount,
                    DepositAmount = b.DepositAmount,
                    BookingStatus = b.BookingStatus,
                    PaymentStatus = b.PaymentStatus
                })
                .ToListAsync();

            return bookings;
        }
    }
}
