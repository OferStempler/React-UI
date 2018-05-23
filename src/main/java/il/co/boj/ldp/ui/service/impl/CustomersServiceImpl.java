package il.co.boj.ldp.ui.service.impl;

import il.co.boj.ldp.ui.dao.CustomerRepository;
import il.co.boj.ldp.ui.model.Customer;
import il.co.boj.ldp.ui.service.CustomSequencesService;
import il.co.boj.ldp.ui.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.List;

/**
 * Created by ofer on 09/04/18.
 */
@Service
public class CustomersServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CustomSequencesService systemConfigService;

    @Override
    public void update(String user, Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    public void create(String user, Customer customer) {
        if (StringUtils.isEmpty(customer.getId())){
            customer.setCustomerId(systemConfigService.generateNextCustomerId());
        }
        customerRepository.save(customer);
    }

    @Override
    public boolean deleteById(String user, String id) {
        Customer customer = customerRepository.findOne(id);
        if (customer != null) {
            List<Customer> customers = customerRepository.findByCustomerId(customer.getCustomerId());
            if(!CollectionUtils.isEmpty(customers)){
                customerRepository.delete(id);
                return true;
            }
        }
        return false;
    }

    @Override
    public Customer findById(String user, String id) {
        return customerRepository.findById(id);
    }

    @Override
    public List<Customer> findAll(String user) {
        List<Customer> customers = customerRepository.findAllByCustomerIdNotNull(new Sort(Sort.Direction.ASC, "name"));
        return customers;
    }



}
