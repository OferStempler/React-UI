package il.co.boj.ldp.ui.controllers;

import il.co.boj.ldp.ui.model.ServiceDependencies;
import il.co.boj.ldp.ui.security.auth.JwtAuthenticationToken;
import il.co.boj.ldp.ui.service.ServiceDependenciesService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping(value = "/api/serviceDependencies")
@Log4j
public class ServiceDependenciesController {

    @Autowired
    ServiceDependenciesService serviceDependenciesService;

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    String deleteById(JwtAuthenticationToken token, @PathVariable(value = "id") String id) {
        String user = Util.getUser(token);
        return serviceDependenciesService.deleteById(user, id);
    }

    @RequestMapping(value = "/", method = RequestMethod.PUT)
    ServiceDependencies update(JwtAuthenticationToken token, @RequestBody ServiceDependencies entity) {
        String user = Util.getUser(token);
        return serviceDependenciesService.update(user, entity);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    ServiceDependencies create(JwtAuthenticationToken token, @RequestBody ServiceDependencies entity) {
        String user = Util.getUser(token);
        return serviceDependenciesService.create(user, entity);
    }
}
