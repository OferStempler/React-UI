package il.co.boj.ldp.ui.dao;

import il.co.boj.ldp.ui.model.ServiceRegularExpressions;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRegexRepository extends MongoRepository<ServiceRegularExpressions, String> {

    List<ServiceRegularExpressions> findByRegexId(Integer regexId);
    List<ServiceRegularExpressions> findByServiceIdAndRegexIdNotNull(Integer serviceId);
    List<ServiceRegularExpressions> findByServiceId(int serviceId);

}
