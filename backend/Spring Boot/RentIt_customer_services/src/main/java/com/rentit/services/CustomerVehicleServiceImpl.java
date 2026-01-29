package com.rentit.services;

import com.rentit.dto.AddressDTO;
import com.rentit.dto.OwnerDTO;
import com.rentit.dto.VehicleDTO;
import com.rentit.dto.VehicleImageDTO;
import com.rentit.entities.*;
import com.rentit.repositories.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerVehicleServiceImpl implements CustomerVehicleService {

    private final VehicleRepository vehicleRepository;

    // Constructor-based dependency injection
    public CustomerVehicleServiceImpl(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @Override
    public List<VehicleDTO> getAllActiveVehicles() {
        List<Vehicle> activeVehicles = vehicleRepository.findByStatusWithDetails(VehicleStatus.ACTIVE);
        return activeVehicles.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public VehicleDTO getActiveVehicleById(int vehicleId) {
        Vehicle vehicle = vehicleRepository.findByVehicleIdAndStatusWithDetails(vehicleId, VehicleStatus.ACTIVE)
                .orElseThrow(() -> new RuntimeException("Vehicle not found or not active with ID: " + vehicleId));
        return convertToDTO(vehicle);
    }

    // ---------- HELPER METHODS ----------

    /**
     * Convert Vehicle entity to VehicleDTO
     */
    private VehicleDTO convertToDTO(Vehicle vehicle) {
        VehicleDTO dto = new VehicleDTO();

        // Basic vehicle information
        dto.setVehicleId(vehicle.getVehicleId());
        dto.setVehicleName(vehicle.getModel() != null ? vehicle.getModel().getModel() : null);
        dto.setVehicleType(vehicle.getVehicleType() != null ? vehicle.getVehicleType().getVehicleTypeName() : null);
        dto.setBrand(vehicle.getModel() != null && vehicle.getModel().getBrand() != null
                ? vehicle.getModel().getBrand().getBrand()
                : null);
        dto.setModel(vehicle.getModel() != null ? vehicle.getModel().getModel() : null);
        dto.setRegistrationNumber(vehicle.getVehicleNumber());
        dto.setRcNumber(vehicle.getVehicleRcNumber());
        dto.setFuelType(vehicle.getFuelType() != null ? vehicle.getFuelType().getFuelType() : null);

        // Pricing information from VehicleType
        if (vehicle.getVehicleType() != null) {
            dto.setPricePerDay(vehicle.getVehicleType().getRate());
            dto.setPriceUnit(vehicle.getVehicleType().getPriceUnit() != null
                    ? vehicle.getVehicleType().getPriceUnit().toString()
                    : null);
            dto.setDeposit(vehicle.getVehicleType().getDeposit());
        }

        // Status and features
        dto.setAvailabilityStatus(vehicle.getStatus() != null ? vehicle.getStatus().toString() : null);
        dto.setHasAC(vehicle.isAc());
        dto.setDescription(vehicle.getDescription());

        // Vehicle images
        dto.setVehicleImages(convertVehicleImages(vehicle.getVehicleImages()));

        // Owner information
        dto.setOwner(convertToOwnerDTO(vehicle.getOwner()));

        return dto;
    }

    /**
     * Convert User entity to OwnerDTO
     */
    private OwnerDTO convertToOwnerDTO(User owner) {
        if (owner == null) {
            return null;
        }

        OwnerDTO dto = new OwnerDTO();
        dto.setOwnerId(owner.getUserId());

        // Concatenate owner name
        String fullName = buildFullName(owner.getFname(), owner.getMname(), owner.getLname());
        dto.setOwnerName(fullName);

        dto.setOwnerPhoneNumber(owner.getPhone());
        dto.setOwnerEmail(owner.getEmail());
        dto.setDrivingLicenseNumber(owner.getDrivingLicenceNo());
        dto.setVerificationStatus(owner.getApprovalStatus() != null
                ? owner.getApprovalStatus().toString()
                : null);

        // Address information
        dto.setAddress(convertToAddressDTO(owner));

        return dto;
    }

    /**
     * Convert Area and City information to AddressDTO
     */
    private AddressDTO convertToAddressDTO(User owner) {
        if (owner == null) {
            return null;
        }

        AddressDTO dto = new AddressDTO();
        dto.setAddressLine(owner.getAddress());

        if (owner.getArea() != null) {
            dto.setArea(owner.getArea().getAreaName());
            dto.setPincode(owner.getArea().getPincode());

            if (owner.getArea().getCity() != null) {
                dto.setCity(owner.getArea().getCity().getCityName());
            }
        }

        return dto;
    }

    /**
     * Convert vehicle images to VehicleImageDTO list
     */
    private List<VehicleImageDTO> convertVehicleImages(List<VehicleImage> images) {
        if (images == null || images.isEmpty()) {
            return new ArrayList<>();
        }

        return images.stream()
                .map(this::convertToVehicleImageDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert VehicleImage entity to VehicleImageDTO with Base64 encoding
     */
    private VehicleImageDTO convertToVehicleImageDTO(VehicleImage image) {
        VehicleImageDTO dto = new VehicleImageDTO();
        dto.setImageId(image.getVehicleImageId());

        // Convert byte array to Base64 string
        if (image.getImage() != null) {
            String base64Image = Base64.getEncoder().encodeToString(image.getImage());
            dto.setImageData(base64Image);
        }

        dto.setPrimary(image.isPrimary());
        return dto;
    }

    /**
     * Build full name from first, middle, and last names
     */
    private String buildFullName(String firstName, String middleName, String lastName) {
        StringBuilder fullName = new StringBuilder();

        if (firstName != null && !firstName.trim().isEmpty()) {
            fullName.append(firstName.trim());
        }

        if (middleName != null && !middleName.trim().isEmpty()) {
            if (fullName.length() > 0) {
                fullName.append(" ");
            }
            fullName.append(middleName.trim());
        }

        if (lastName != null && !lastName.trim().isEmpty()) {
            if (fullName.length() > 0) {
                fullName.append(" ");
            }
            fullName.append(lastName.trim());
        }

        return fullName.toString();
    }
}
