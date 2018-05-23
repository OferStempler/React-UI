package il.co.boj.ldp.ui.dao;

import il.co.boj.ldp.ui.model.Services;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ServiceRepository extends MongoRepository<Services, String>{

    Services findByServiceName(String serviceName);
    Services findByServiceId(int serviceId);
}
