import { customerApi } from "../api/axios";

// Uses customerApi which points to http://localhost:9093/api

const BASE_URL = "/bookings";

const createBooking = async (bookingData) => {
  try {
    const response = await customerApi.post(BASE_URL, bookingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getBookingsByUser = async (userId) => {
  try {
    const response = await customerApi.get(`${BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  createBooking,
  getBookingsByUser,
};
