package il.co.boj.ldp.ui.dao;

import il.co.boj.ldp.ui.model.ServiceReplacements;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by ofer on 22/02/18.
 */
public interface ServiceReplacementsRepository extends MongoRepository<ServiceReplacements, String> {

    List<ServiceReplacements> findByServiceId(int serviceId);
}
