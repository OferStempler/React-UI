package il.co.boj.ldp.ui.service.impl;

import il.co.boj.ldp.ui.dao.ServiceParamsRepository;
import il.co.boj.ldp.ui.model.ServiceParams;
import il.co.boj.ldp.ui.service.ServiceParamsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by ofer on 14/05/18.
 */
@Service
public class ServiceParamsServiceImpl implements ServiceParamsService {
    @Autowired
    ServiceParamsRepository serviceParamsRepository;

    @Override
    public void update(String user, ServiceParams serviceParams) {
         serviceParamsRepository.save(serviceParams);
    }

    @Override
    public void create(String user, ServiceParams serviceParams) {
        serviceParamsRepository.save(serviceParams);
    }

    @Override
    public void deleteById(String user, String id) {
         serviceParamsRepository.delete(id);
    }

    @Override
    public ServiceParams findById(String user, String id) {
        return serviceParamsRepository.findOne(id);
    }

    @Override
    public List<ServiceParams> findAll(String user) {
        return serviceParamsRepository.findAll();
    }
}
