package com.rentit.services;

import com.rentit.dto.VehicleDetailDTO;
import com.rentit.dto.VehicleImageDTO;
import com.rentit.dto.VehicleListDTO;
import com.rentit.entities.Vehicle;
import com.rentit.entities.VehicleImage;
import com.rentit.repositories.VehicleImageRepository;
import com.rentit.repositories.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private VehicleImageRepository vehicleImageRepository;

    /**
     * Browse all available vehicles
     */
    public List<VehicleListDTO> browseAvailableVehicles() {
        List<Vehicle> vehicles = vehicleRepository.findByStatus("Available");
        return vehicles.stream()
                .map(this::convertToListDTO)
                .collect(Collectors.toList());
    }

    /**
     * Browse vehicles by vehicle type
     */
    public List<VehicleListDTO> browseVehiclesByType(Integer vehicleTypeId) {
        List<Vehicle> vehicles = vehicleRepository.findByStatusAndVehicleType("Available", vehicleTypeId);
        return vehicles.stream()
                .map(this::convertToListDTO)
                .collect(Collectors.toList());
    }

    /**
     * Browse vehicles by brand
     */
    public List<VehicleListDTO> browseVehiclesByBrand(Integer brandId) {
        List<Vehicle> vehicles = vehicleRepository.findByBrandId(brandId);
        return vehicles.stream()
                .filter(v -> "Available".equals(v.getStatus()))
                .map(this::convertToListDTO)
                .collect(Collectors.toList());
    }

    /**
     * Browse vehicles by fuel type
     */
    public List<VehicleListDTO> browseVehiclesByFuelType(Integer fuelTypeId) {
        List<Vehicle> vehicles = vehicleRepository.findByFuelType_FuelId(fuelTypeId);
        return vehicles.stream()
                .filter(v -> "Available".equals(v.getStatus()))
                .map(this::convertToListDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get vehicle details by ID
     */
    public VehicleDetailDTO getVehicleDetails(Integer vehicleId) {
        Optional<Vehicle> vehicleOpt = vehicleRepository.findById(vehicleId);
        if (vehicleOpt.isEmpty()) {
            return null;
        }

        Vehicle vehicle = vehicleOpt.get();
        return convertToDetailDTO(vehicle);
    }

    /**
     * Convert Vehicle entity to VehicleListDTO
     */
    private VehicleListDTO convertToListDTO(Vehicle vehicle) {
        VehicleListDTO dto = new VehicleListDTO();
        dto.setVehicleId(vehicle.getVehicleId());
        dto.setVehicleTypeName(vehicle.getVehicleType().getVehicleTypeName());
        dto.setBrandName(vehicle.getModel().getBrand().getBrand());
        dto.setModelName(vehicle.getModel().getModel());
        dto.setFuelType(vehicle.getFuelType() != null ? vehicle.getFuelType().getFuelType() : "N/A");
        dto.setAc(vehicle.getAc());
        dto.setStatus(vehicle.getStatus());
        dto.setVehicleNumber(vehicle.getVehicleNumber());
        dto.setRate(vehicle.getVehicleType().getRate());
        dto.setPriceUnit(vehicle.getVehicleType().getPriceUnit());

        // Get primary image
        Optional<VehicleImage> primaryImage = vehicleImageRepository
                .findPrimaryImageByVehicleId(vehicle.getVehicleId());
        if (primaryImage.isPresent() && primaryImage.get().getImage() != null) {
            String base64Image = Base64.getEncoder().encodeToString(primaryImage.get().getImage());
            dto.setPrimaryImageBase64(base64Image);
        }

        return dto;
    }

    /**
     * Convert Vehicle entity to VehicleDetailDTO
     */
    private VehicleDetailDTO convertToDetailDTO(Vehicle vehicle) {
        VehicleDetailDTO dto = new VehicleDetailDTO();

        // Basic vehicle info
        dto.setVehicleId(vehicle.getVehicleId());
        dto.setOwnerId(vehicle.getOwnerId());
        dto.setAc(vehicle.getAc());
        dto.setStatus(vehicle.getStatus());
        dto.setVehicleNumber(vehicle.getVehicleNumber());
        dto.setVehicleRcNumber(vehicle.getVehicleRcNumber());
        dto.setDescription(vehicle.getDescription());

        // Vehicle type info
        if (vehicle.getVehicleType() != null) {
            dto.setVehicleTypeId(vehicle.getVehicleType().getVehicleTypeId());
            dto.setVehicleTypeName(vehicle.getVehicleType().getVehicleTypeName());
            dto.setRate(vehicle.getVehicleType().getRate());
            dto.setDeposit(vehicle.getVehicleType().getDeposit());
            dto.setPriceUnit(vehicle.getVehicleType().getPriceUnit());
        }

        // Model and brand info
        if (vehicle.getModel() != null) {
            dto.setModelId(vehicle.getModel().getModelId());
            dto.setModelName(vehicle.getModel().getModel());

            if (vehicle.getModel().getBrand() != null) {
                dto.setBrandId(vehicle.getModel().getBrand().getBrandId());
                dto.setBrandName(vehicle.getModel().getBrand().getBrand());
            }
        }

        // Fuel type info
        if (vehicle.getFuelType() != null) {
            dto.setFuelTypeId(vehicle.getFuelType().getFuelId());
            dto.setFuelType(vehicle.getFuelType().getFuelType());
        }

        // Images
        List<VehicleImage> images = vehicleImageRepository.findByVehicle_VehicleId(vehicle.getVehicleId());
        List<VehicleImageDTO> imageDTOs = images.stream()
                .map(this::convertToImageDTO)
                .collect(Collectors.toList());
        dto.setImages(imageDTOs);

        return dto;
    }

    /**
     * Convert VehicleImage entity to VehicleImageDTO
     */
    private VehicleImageDTO convertToImageDTO(VehicleImage image) {
        VehicleImageDTO dto = new VehicleImageDTO();
        dto.setVehicleImageId(image.getVehicleImageId());
        dto.setIsPrimary(image.getIsPrimary());
        dto.setCreatedAt(image.getCreatedAt());

        if (image.getImage() != null) {
            String base64Image = Base64.getEncoder().encodeToString(image.getImage());
            dto.setImageBase64(base64Image);
        }

        return dto;
    }
}
