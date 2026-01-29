package com.rentit.repositories;

import com.rentit.entities.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {

    // Find all vehicles with status 'Available'
    List<Vehicle> findByStatus(String status);

    // Find vehicles by vehicle type
    List<Vehicle> findByVehicleType_VehicleTypeId(Integer vehicleTypeId);

    // Find vehicles by brand via model
    @Query("SELECT v FROM Vehicle v WHERE v.model.brand.brandId = :brandId")
    List<Vehicle> findByBrandId(Integer brandId);

    // Find vehicles by fuel type
    List<Vehicle> findByFuelType_FuelId(Integer fuelTypeId);

    // Find available vehicles by type
    @Query("SELECT v FROM Vehicle v WHERE v.status = :status AND v.vehicleType.vehicleTypeId = :vehicleTypeId")
    List<Vehicle> findByStatusAndVehicleType(String status, Integer vehicleTypeId);
}
