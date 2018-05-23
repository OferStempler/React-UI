package il.co.boj.ldp.ui.dao;

import il.co.boj.ldp.ui.model.Customer;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by ofer on 09/04/18.
 */
@Repository
public interface CustomerRepository extends MongoRepository<Customer, String> {

    void deleteById(String id);
    Customer findById(String id);
    List<Customer> findByCustomerId(int customerId);

    List<Customer> findAllByCustomerIdNotNull(Sort sort);

}
