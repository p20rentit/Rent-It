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
};

export default OwnerBookingService;
