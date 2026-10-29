package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.docker.dto.Request;
import com.klef.soa.docker.dto.Response;
import com.klef.soa.docker.entity.OpticalStore;
import com.klef.soa.docker.service.OpticalStoreService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/optical")
public class OpticalStoreController {

	@Autowired 
	private OpticalStoreService service;
	
	@GetMapping("/")
	public String test() {
		return "Is Running";
	}
	
	@PostMapping("/add")
	public ResponseEntity<Response> add(@Valid @RequestBody Request op){
		return ResponseEntity.status(201).body(service.add(op));
	}
	
	@GetMapping("/displayall")
	public ResponseEntity<List<Response>> displayall(){
	
		return ResponseEntity.ok(service.displayAll());
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteById(@PathVariable Long id)
	{
		String message = service.deleteById(id);
		return ResponseEntity.ok(message);
	}
	
	@PostMapping("/update/{id}")
	public ResponseEntity<Response> update(@PathVariable long id,@Valid @RequestBody Request op){
		Response re = service.update(id, op);
		
		if(re == null) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(re);
	}
	

	public ResponseEntity<Response> displayById(@PathVariable long id){
		Response re = service.displayById(id);
		
		if(re == null) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(re);
	} 
	
}
