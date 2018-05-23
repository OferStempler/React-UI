package il.co.boj.ldp.ui.service;

import il.co.boj.ldp.ui.model.ServiceDependencies;


public interface ServiceDependenciesService {

    ServiceDependencies update(String user, ServiceDependencies serviceDependencies);

    ServiceDependencies create(String user, ServiceDependencies serviceDependencies);

    String deleteById(String user, String id);
}
