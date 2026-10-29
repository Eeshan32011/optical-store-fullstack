package com.klef.soa.docker.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig
{
    @Bean
    public OpenAPI customOpenAPI()
    {
        return new OpenAPI()
                .info(new Info()
                        .title("Optical Store Service")
                        .version("1.0")
                        .description("REST API Documentation for Optical Store Microservice")
                        .contact(new Contact()
                                .name("Eeshan")
                                .email("2400032011@kluniversity.in")));
    }
}
