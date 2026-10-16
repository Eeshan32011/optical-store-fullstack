package com.klef.soa.exam.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.exam.entity.OpticalStore;
import com.klef.soa.exam.repository.OpticalStoreRepository;

@Service
public class OpticalStoreServiceImple implements OpticalStoreService{

	@Autowired
	private OpticalStoreRepository repository;
	
	@Override
	public OpticalStore add(OpticalStore os) {
	
		return repository.save(os);
	}

	@Override
	public List<OpticalStore> displayAll() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public String deleteById(long id) {
		boolean flag = repository.existsById(id);
		if(flag) 
		{ 
		 
			repository.deleteById(id);
			return "Id Deleted Successfully";
		}
		else
			
		{
			return "ID Not Found";
		}
		
	}

	
}
