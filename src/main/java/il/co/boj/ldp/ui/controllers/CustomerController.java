package il.co.boj.ldp.ui.controllers;

import il.co.boj.ldp.ui.model.Customer;
import il.co.boj.ldp.ui.security.auth.JwtAuthenticationToken;
import il.co.boj.ldp.ui.service.CustomerService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Created by ofer on 09/04/18.
 */
@RestController
@RequestMapping(value = "/api/customer")
@Log4j
public class CustomerController {
    @Autowired
    CustomerService customerService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    List<Customer> get(JwtAuthenticationToken token) {
        String user = Util.getUser(token);
        return customerService.findAll(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    Customer getById(JwtAuthenticationToken token, @PathVariable(value = "id") String id) {
        String user = Util.getUser(token);
        return customerService.findById(user, id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    boolean deleteById(JwtAuthenticationToken token, @PathVariable(value = "id") String id) {
        String user = Util.getUser(token);
        return customerService.deleteById(user, id);
    }

    @RequestMapping(value = "/", method = RequestMethod.PUT)
    void update(JwtAuthenticationToken token, @RequestBody Customer customer) {
        String user = Util.getUser(token);
        customerService.update(user, customer);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    void create(JwtAuthenticationToken token, @RequestBody Customer customer) {
        String user = Util.getUser(token);
        customerService.create(user, customer);
    }
}
