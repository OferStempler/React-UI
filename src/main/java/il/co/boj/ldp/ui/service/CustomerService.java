package il.co.boj.ldp.ui.service;

import il.co.boj.ldp.ui.model.Customer;

import java.util.List;

/**
 * Created by ofer on 09/04/18.
 */
public interface CustomerService {

    void update(String user, Customer Customers);
    void create(String user, Customer customer);
    boolean deleteById(String user, String id);
    Customer findById(String user, String id);
    List<Customer> findAll(String user);
}
