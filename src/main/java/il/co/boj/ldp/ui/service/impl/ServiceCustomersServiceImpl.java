package il.co.boj.ldp.ui.service.impl;

import il.co.boj.ldp.ui.dao.CustomerRepository;
import il.co.boj.ldp.ui.dao.ServiceCustomersRespository;
import il.co.boj.ldp.ui.dao.ServiceRepository;
import il.co.boj.ldp.ui.model.Customer;
import il.co.boj.ldp.ui.model.ServiceCustomers;
import il.co.boj.ldp.ui.model.Services;
import il.co.boj.ldp.ui.service.ServiceCustomersService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ofer on 09/04/18.
 */
@Service
@Log4j
public class ServiceCustomersServiceImpl implements ServiceCustomersService {

    @Autowired
    ServiceCustomersRespository serviceCustomersRespository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @Override
    public void update(String user, ServiceCustomers ServiceCustomer) {
        serviceCustomersRespository.save(ServiceCustomer);
    }

    @Override
    public void create(String user, ServiceCustomers serviceCustomer) {
        if (StringUtils.isEmpty(serviceCustomer.getId())){
            serviceCustomersRespository.save(serviceCustomer);
        }
    }

    @Override
    public boolean deleteById(String user, String id) {
        ServiceCustomers ServiceCustomer = serviceCustomersRespository.findOne(id);
        if (ServiceCustomer != null) {
                serviceCustomersRespository.delete(id);
                return true;
        }
        return false;
    }

    @Override
    public ServiceCustomers findById(String user, String id) {
        return serviceCustomersRespository.findById(id);
    }

    @Override
    public List<ServiceCustomers> findAll(String user) {
        List<ServiceCustomers> serviceCustomersList = serviceCustomersRespository.findAll();
        return serviceCustomersList;
    }

    @Override
    public List<Customer> getCustomersByServiceId(String user, int serviceId) {
        List<Customer> customersList = new ArrayList<>();
        List<ServiceCustomers> servicesIdList = serviceCustomersRespository.findByServiceId(serviceId);
        if(servicesIdList != null && servicesIdList.size()>0 ){
            for (ServiceCustomers serviceCustomer : servicesIdList) {
                customersList.addAll(customerRepository.findByCustomerId(serviceCustomer.getCustomerId()));
            }
        }else {
            log.debug("Did not find any Customers in ServiceCustomer with serviceId ["+serviceId+"]");
        }
        log.debug("Retuning customer list size ["+customersList.size()+"]");
       return customersList;
    }

    @Override
    public List<Services> getServicesByCustomerId(String user, int customerId) {
        List<Services> serviceList = new ArrayList<>();
        List<ServiceCustomers> servicesIdList = serviceCustomersRespository.findByCustomerId(customerId);
        if(servicesIdList != null && servicesIdList.size() > 0 ) {
            for (ServiceCustomers serviceCustomer : servicesIdList) {
                serviceList.add(serviceRepository.findByServiceId(serviceCustomer.getServiceId()));
            }
        } else {
            log.debug("Did not find any Services in ServiceCustomer with customerId ["+customerId+"]");

        }
        log.debug("Retuning customer list size ["+serviceList.size()+"]");
        return serviceList;
    }
}
