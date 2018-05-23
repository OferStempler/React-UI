package il.co.boj.ldp.ui.controllers;

import il.co.boj.ldp.ui.model.Customer;
import il.co.boj.ldp.ui.model.ServiceCustomers;
import il.co.boj.ldp.ui.model.Services;
import il.co.boj.ldp.ui.security.auth.JwtAuthenticationToken;
import il.co.boj.ldp.ui.service.ServiceCustomersService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by ofer on 09/04/18.
 */
@RestController
@RequestMapping(value = "/api/serviceCustomers")
@Log4j
public class ServiceCustomersController {

    @Autowired
    ServiceCustomersService serviceCustomersService;

    @RequestMapping(value = "/getCustomerByServiceId", params  = {"serviceId"}, method = RequestMethod.GET)
    List<Customer> getCustomerByServiceId(JwtAuthenticationToken token, @RequestParam(value = "serviceId") int serviceId) {
        log.debug("gotServiceId ["+serviceId+"]" );
        String user = Util.getUser(token);
        List<Customer> customers = serviceCustomersService.getCustomersByServiceId(user, serviceId);
        log.debug("Returning customers list: ["+customers.toString()+"]");
        return customers;
    }
    @RequestMapping(value = "/getServicesByCustomerId", params = {"customerId"}, method = RequestMethod.GET)
    List<Services> getServicesByCustomerId(JwtAuthenticationToken token, @RequestParam(value = "customerId") int customerId) {
        log.debug("got customerId ["+customerId+"]" );
        String user = Util.getUser(token);
        List<Services> serviceList = serviceCustomersService.getServicesByCustomerId(user, customerId);
        log.debug("Returning service list: ["+serviceList.toString()+"]");
        return serviceList;
    }


    @RequestMapping(value = "/", method = RequestMethod.GET)
    List<ServiceCustomers> get(JwtAuthenticationToken token) {
        String user = Util.getUser(token);
        return serviceCustomersService.findAll(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    ServiceCustomers getById(JwtAuthenticationToken token, @PathVariable(value = "id") String id) {
        String user = Util.getUser(token);
        return serviceCustomersService.findById(user, id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    boolean deleteById(JwtAuthenticationToken token, @PathVariable(value = "id") String id) {
        String user = Util.getUser(token);
        return serviceCustomersService.deleteById(user, id);
    }

    @RequestMapping(value = "/", method = RequestMethod.PUT)
    void update(JwtAuthenticationToken token, @RequestBody ServiceCustomers serviceCustomer) {
        String user = Util.getUser(token);
        serviceCustomersService.update(user, serviceCustomer);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    void create(JwtAuthenticationToken token, @RequestBody ServiceCustomers serviceCustomer) {
        String user = Util.getUser(token);
        serviceCustomersService.create(user, serviceCustomer);
    }
}
