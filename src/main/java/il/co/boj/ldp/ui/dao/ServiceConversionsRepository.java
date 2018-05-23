package il.co.boj.ldp.ui.dao;

import il.co.boj.ldp.ui.model.ServiceConversions;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by ofer on 18/02/18.
 */
@Repository
public interface ServiceConversionsRepository extends MongoRepository<ServiceConversions, String> {

    List<ServiceConversions> findByServiceId(int serviceId);

    ServiceConversions findFirstByServiceId(int serviceId);

    void deleteByServiceId(int serviceId);

}
