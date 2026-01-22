package com.p20.rentit.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.p20.rentit.entities.City;
import com.p20.rentit.repositories.CityRepository;

@Service
public class CityService {
	
	@Autowired
	CityRepository crepo;
	
	public List<City> getAll(){
		return crepo.findAll();
	}

}
