package com.klef.soa.exam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.soa.exam.entity.OpticalStore;

@Repository
public interface OpticalStoreRepository extends JpaRepository<OpticalStore, Long>{

}
