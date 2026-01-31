using System.Collections.Generic;
using System.Threading.Tasks;
using RentIt_owner_services.DTOs;

namespace RentIt_owner_services.Services.Interfaces
{
    public interface IBookingService
    {
        Task<IEnumerable<OwnerBookingDTO>> GetBookingsByOwnerId(int ownerId);
    }
}
