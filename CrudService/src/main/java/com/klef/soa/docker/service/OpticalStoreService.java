package com.klef.soa.docker.service;

import java.util.List;

import com.klef.soa.docker.dto.Request;
import com.klef.soa.docker.dto.Response;
import com.klef.soa.docker.entity.OpticalStore;

public interface OpticalStoreService {
	
	Response add(Request os);
	
	List<Response> displayAll();
	
	Response displayById(long id);
	
	Response update(long id, Request os); 
	
	String deleteById(long id);
	
	
}
