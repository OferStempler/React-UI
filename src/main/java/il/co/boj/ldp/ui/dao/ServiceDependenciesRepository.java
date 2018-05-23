package il.co.boj.ldp.ui.dao;

import il.co.boj.ldp.ui.model.ServiceDependencies;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceDependenciesRepository extends MongoRepository<ServiceDependencies, String>{

    List<ServiceDependencies> findByServiceId(Integer serviceId);

}
