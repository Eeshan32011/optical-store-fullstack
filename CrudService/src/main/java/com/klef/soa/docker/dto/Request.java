package com.klef.soa.docker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
public class Request {
	
	@NotBlank(message = "Store Name Shouldn't be Empty")
	private String storeName;
	
	@NotBlank(message = "City Shouldn't be Empty")
	private String city;
	
	private int frameCount;

	@NotNull(message = "Please select whether eye tests are offered")
	private Boolean offersEyeTest;

}
