package il.co.boj.ldp.ui.dao;

import il.co.boj.ldp.ui.model.ServiceParams;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by ofer on 14/05/18.
 */
@Repository
public interface ServiceParamsRepository extends MongoRepository<ServiceParams, String>{
}
