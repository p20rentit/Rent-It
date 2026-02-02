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

        public async Task<Booking> CompleteReturn(int bookingId, int ownerId)
        {
            try
            {
                var booking = await _context.Bookings
                .Include(b => b.Vehicle)
                .Include(b => b.User)
                .Include(b => b.Payments)
                .FirstOrDefaultAsync(b => b.BookingId == bookingId);

            if (booking == null)
                throw new System.Exception("Booking not found");

            if (booking.Vehicle.OwnerId != ownerId)
                throw new System.Exception("Unauthorized access to this booking");

            if (booking.BookingStatus != "RETURN_REQUESTED")
                throw new System.Exception($"Cannot complete return. Current status: {booking.BookingStatus}");

            // 1. Calculate Settlement
            decimal rent = booking.TotalAmount ?? 0;
            decimal paid = booking.PaidAmount ?? 0;
            decimal diff = paid - rent;

            // 2. Update Booking & Vehicle Status
            booking.BookingStatus = "COMPLETED"; // Valid per updated schema
            booking.Vehicle.Status = "ACTIVE"; // Valid Enum (AVAILABLE is invalid, ACTIVE is the equivalent) 
            
            // 3. Settlement Payments Logic
            if (diff > 0)
            {
                // Refund Case: Owner pays Customer
                var refund = new Payment
                {
                    BookingId = booking.BookingId,
                    Booking = booking, // Explicit navigation
                    PaymentMethod = "Cash", // Safe 'Active' enum value
                    PaymentAmount = diff,
                    PaymentStatus = "REFUNDED", // Valid Enum
                    TransactionId = "REF-" + System.Guid.NewGuid().ToString().Substring(0, 8),
                    PaymentDate = System.DateTime.Now,
                    PaymentType = "REFUND" // Valid Enum
                };
                booking.Payments.Add(refund); // Link to collection
                _context.Payments.Add(refund); // Add to context
                
                booking.PaymentStatus = "REFUNDED"; 
            }
            else if (diff < 0)
            {
                // Due Case: Customer owes Owner
                var due = new Payment
                {
                    BookingId = booking.BookingId,
                    Booking = booking, // Explicit navigation
                    PaymentMethod = "Cash", // Safe 'Active' enum value
                    PaymentAmount = System.Math.Abs(diff),
                    PaymentStatus = "PENDING", // Valid Enum
                    TransactionId = "DUE-" + System.Guid.NewGuid().ToString().Substring(0, 8),
                    PaymentDate = System.DateTime.Now,
                    PaymentType = "FINAL", // Valid Enum
                };
                booking.Payments.Add(due); // Link to collection
                _context.Payments.Add(due); // Add to context
                
                booking.PaymentStatus = "PENDING"; 
            }
            else 
            {
                // Exact payment
                booking.PaymentStatus = "SUCCESS"; 
            }

            // 4. Atomic Save
            await _context.SaveChangesAsync();
            return booking;
            }
            catch (Microsoft.EntityFrameworkCore.DbUpdateException ex)
            {
                // Log and rethrow strictly for 400 debugging
                var inner = ex.InnerException?.Message ?? ex.Message;
                throw new System.Exception($"Database Save Failed: {inner}");
            }
            catch (System.Exception ex)
            {
                throw new System.Exception($"Error completing return: {ex.Message}");
            }
        }


        public async Task<bool> HasActiveBookings(int vehicleId)
        {
            return await _context.Bookings
                .AnyAsync(b => b.VehicleId == vehicleId && 
                               b.BookingStatus != "COMPLETED" && 
                               b.BookingStatus != "CANCELLED");
        }
    }
}
