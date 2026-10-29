package com.klef.soa.docker.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Response {
	
	private Long id;
	private String storeName;
	private String city;
	private int frameCount;
	private boolean offersEyeTest;
	
}

