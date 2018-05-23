package il.co.boj.ldp.ui.service;

import il.co.boj.ldp.ui.model.Customer;
import il.co.boj.ldp.ui.model.ServiceCustomers;
import il.co.boj.ldp.ui.model.Services;

import java.util.List;

/**
 * Created by ofer on 09/04/18.
 */
public interface ServiceCustomersService {

    void update(String user, ServiceCustomers serviceCustomers);
    void create(String user, ServiceCustomers serviceCustomers);
    boolean deleteById(String user, String id);
    ServiceCustomers findById(String user, String id);
    List<ServiceCustomers> findAll(String user);

    List<Customer> getCustomersByServiceId(String user, int serviceId);
    List<Services> getServicesByCustomerId(String user, int customerId);

}
