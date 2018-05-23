package il.co.boj.ldp.ui.controllers;

import il.co.boj.ldp.ui.model.ServiceParams;
import il.co.boj.ldp.ui.security.auth.JwtAuthenticationToken;
import il.co.boj.ldp.ui.service.ServiceParamsService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by ofer on 14/05/18.
 */
@RestController
@RequestMapping(value = "/api/serviceParams")
@Log4j
public class ServiceParamController {
    @Autowired
    ServiceParamsService serviceParamsService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    List<ServiceParams> get(JwtAuthenticationToken token) {
        String user = Util.getUser(token);
        return serviceParamsService.findAll(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    ServiceParams getById(JwtAuthenticationToken token, @PathVariable(value = "id") String id) {
        String user = Util.getUser(token);
        return serviceParamsService.findById(user, id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    void deleteById(JwtAuthenticationToken token, @PathVariable(value = "id") String id) {
        String user = Util.getUser(token);
        serviceParamsService.deleteById(user, id);
    }

    @RequestMapping(value = "/", method = RequestMethod.PUT)
    void update(JwtAuthenticationToken token, @RequestBody ServiceParams serviceParams) {
        String user = Util.getUser(token);
        serviceParamsService.update(user, serviceParams);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    void create(JwtAuthenticationToken token, @RequestBody ServiceParams serviceParams) {
        String user = Util.getUser(token);
        serviceParamsService.create(user, serviceParams);
    }
}
