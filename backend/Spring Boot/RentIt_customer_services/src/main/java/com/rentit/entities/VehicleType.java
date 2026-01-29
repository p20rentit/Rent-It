package com.rentit.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vehicle_type")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vehicle_type_id")
    private Integer vehicleTypeId;

    @Column(name = "vehicle_type_name")
    private String vehicleTypeName;

    @Column(name = "rate")
    private Double rate;

    @Column(name = "deposit")
    private Double deposit;

    @Column(name = "price_unit")
    private String priceUnit;
}
