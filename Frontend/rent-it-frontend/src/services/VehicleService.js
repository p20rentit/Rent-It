import { ownerApi } from "../api/axios";

// Owner Vehicle Service - Uses ownerApi (port 5004)
// This service communicates with the .NET Owner microservice
const BASE_URL = "/owner/vehicles";

// Fetch owner vehicles
export const fetchOwnerVehicles = async (ownerId) => {
    const response = await ownerApi.get(`${BASE_URL}/${ownerId}`);
    return response.data;
};

// Add vehicle
export const addVehicle = async (ownerId, vehicleData) => {
    const response = await ownerApi.post(`${BASE_URL}/${ownerId}`, vehicleData);
    return response.data; // returns vehicleId
};

// Update vehicle
export const updateVehicle = async (vehicleId, vehicleData) => {
    const response = await ownerApi.put(`${BASE_URL}/${vehicleId}`, vehicleData);
    return response.data;
};

// Upload vehicle image
export const uploadVehicleImage = async (formData) => {
    const response = await ownerApi.post(`${BASE_URL}/upload-image`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
