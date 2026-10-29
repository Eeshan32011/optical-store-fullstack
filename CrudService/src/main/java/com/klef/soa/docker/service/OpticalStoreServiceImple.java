
package com.klef.soa.docker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.dto.Request;
import com.klef.soa.docker.dto.Response;
import com.klef.soa.docker.entity.OpticalStore;
import com.klef.soa.docker.repository.OpticalStoreRepository;

@Service
public class OpticalStoreServiceImple implements OpticalStoreService {

    @Autowired
    private OpticalStoreRepository repository;

    private Response mapToResponse(OpticalStore os) {
        return Response.builder()
                .id(os.getId())
                .city(os.getCity())
                .frameCount(os.getFrameCount())
                .offersEyeTest(os.isOffersEyeTest())
                .storeName(os.getStoreName())
                .build();
    }

    @Override
    public Response add(Request os) {
        OpticalStore op = new OpticalStore();

        op.setCity(os.getCity());
        op.setFrameCount(os.getFrameCount());
        op.setOffersEyeTest(os.getOffersEyeTest());
        op.setStoreName(os.getStoreName());

        OpticalStore saved = repository.save(op);
        return mapToResponse(saved);
    }

    @Override
    public List<Response> displayAll() {
        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public String deleteById(long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "Id Deleted Successfully";
        }

        return "ID Not Found";
    }

    @Override
    public Response displayById(long id) {
        OpticalStore op = repository.findById(id).orElse(null);

        if (op == null) {
            return null;
        }

        return mapToResponse(op);
    }

    @Override
    public Response update(long id, Request os) {
        OpticalStore op = repository.findById(id).orElse(null);

        if (op == null) {
            return null;
        }

        op.setCity(os.getCity());
        op.setFrameCount(os.getFrameCount());
        op.setStoreName(os.getStoreName());
        op.setOffersEyeTest(os.getOffersEyeTest());

        OpticalStore updated = repository.save(op);
        return mapToResponse(updated);
    }
}
