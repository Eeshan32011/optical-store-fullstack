package com.klef.soa.exam.service;

import java.util.List;

import com.klef.soa.exam.entity.OpticalStore;

public interface OpticalStoreService {
	
	OpticalStore add(OpticalStore os);
	
	List<OpticalStore> displayAll();
	
	String deleteById(long id);
}
