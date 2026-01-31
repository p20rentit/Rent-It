import api from "../api/axios";

const BASE_URL = "/customer/bookings";

const createBooking = async (bookingData) => {
  const response = await api.post(BASE_URL, bookingData);
  return response.data;
};

const getBookingsByUser = async (userId) => {
  const response = await api.get(`${BASE_URL}/user/${userId}`);
  return response.data;
};

const getBookedDates = async (vehicleId) => {
  const response = await api.get(
    `${BASE_URL}/vehicle/${vehicleId}/booked-dates`
  );
  return response.data;
};

export default {
  createBooking,
  getBookingsByUser,
  getBookedDates
};
