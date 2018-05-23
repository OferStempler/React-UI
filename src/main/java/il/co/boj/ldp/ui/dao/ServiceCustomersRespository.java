package il.co.boj.ldp.ui.dao;

import il.co.boj.ldp.ui.model.ServiceCustomers;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by ofer on 09/04/18.
 */
@Repository
public interface ServiceCustomersRespository extends MongoRepository<ServiceCustomers, String> {

    void deleteById(String id);
    ServiceCustomers findById(String id);
    List<ServiceCustomers> findByServiceId(int serviceId);
    List<ServiceCustomers> findByCustomerId(int customerId);
}
