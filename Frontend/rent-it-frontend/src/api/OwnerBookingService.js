import api from "./axios";

const OwnerBookingService = {
    getOwnerBookings: async (ownerId) => {
        try {
            const response = await api.get(`/owner/bookings/${ownerId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching owner bookings:", error);
            throw error;
        }
    },
    completeReturn: async (bookingId, ownerId) => {
        try {
            const response = await api.post(`/owner/bookings/${bookingId}/complete-return`, null, {
                params: { ownerId }
            });
            return response.data;
        } catch (error) {
            console.error("Error completing return:", error);
            throw error;
        }
    }
};

export default OwnerBookingService;
