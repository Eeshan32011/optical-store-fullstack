package com.klef.soa.exam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.exam.entity.OpticalStore;
import com.klef.soa.exam.service.OpticalStoreService;

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
	public ResponseEntity<OpticalStore> add(@RequestBody OpticalStore op){
		OpticalStore ops = service.add(op);
		return ResponseEntity.status(201).body(ops);
	}
	
	@GetMapping("/displayall")
	public ResponseEntity<List<OpticalStore>> displayall(){
		List<OpticalStore> ops = service.displayAll();
		return ResponseEntity.ok(ops);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteById(@PathVariable Long id)
	{
		String message = service.deleteById(id);
		return ResponseEntity.ok(message);
	}
}
