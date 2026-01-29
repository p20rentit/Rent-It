package com.rentit.repositories;

import com.rentit.entities.VehicleImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleImageRepository extends JpaRepository<VehicleImage, Integer> {

    // Find all images for a vehicle
    List<VehicleImage> findByVehicle_VehicleId(Integer vehicleId);

    // Find primary image for a vehicle
    @Query("SELECT vi FROM VehicleImage vi WHERE vi.vehicle.vehicleId = :vehicleId AND vi.isPrimary = 1")
    Optional<VehicleImage> findPrimaryImageByVehicleId(Integer vehicleId);
}
