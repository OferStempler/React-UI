package il.co.boj.ldp.ui.service.impl;

import il.co.boj.ldp.ui.dao.DependencyRepository;
import il.co.boj.ldp.ui.dao.ServiceDependenciesRepository;
import il.co.boj.ldp.ui.model.Dependency;
import il.co.boj.ldp.ui.model.ServiceDependencies;
import il.co.boj.ldp.ui.service.ServiceDependenciesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceDependenciesServiceImpl implements ServiceDependenciesService {


    @Autowired
    ServiceDependenciesRepository serviceDependenciesRepository;

    @Autowired
    DependencyRepository dependencyRepository;

    @Override
    public ServiceDependencies update(String user, ServiceDependencies serviceDependencies) {
        return setName(serviceDependenciesRepository.save(serviceDependencies));

    }

    private ServiceDependencies setName(ServiceDependencies serviceDependencies){
        Dependency dependency = dependencyRepository.findByDependencyId(serviceDependencies.getDependencyId());
        if(dependency != null){
            serviceDependencies.setName(dependency.getName());
        }
        return serviceDependencies;
    }

    @Override
    public ServiceDependencies create(String user, ServiceDependencies serviceDependencies) {
        return setName(serviceDependenciesRepository.save(serviceDependencies));

    }

    @Override
    public String deleteById(String user, String id) {
        serviceDependenciesRepository.delete(id);
        return id;
    }
}
