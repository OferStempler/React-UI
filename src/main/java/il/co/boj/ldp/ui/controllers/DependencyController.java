package il.co.boj.ldp.ui.controllers;

import il.co.boj.ldp.ui.model.Dependency;
import il.co.boj.ldp.ui.security.auth.JwtAuthenticationToken;
import il.co.boj.ldp.ui.service.DependencyService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/dependencies")
@Log4j
public class DependencyController {

    @Autowired
    DependencyService dependencyService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    List<Dependency> get(JwtAuthenticationToken token) {
        String user = Util.getUser(token);
        return dependencyService.findAll(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    Dependency getById(JwtAuthenticationToken token, @PathVariable(value = "id") String id) {
        String user = Util.getUser(token);
        return dependencyService.findById(user, id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    void deleteById(JwtAuthenticationToken token, @PathVariable(value = "id") String id) {
        String user = Util.getUser(token);
        dependencyService.deleteById(user, id);
    }

    @RequestMapping(value = "/", method = RequestMethod.PUT)
    void update(JwtAuthenticationToken token, @RequestBody Dependency dependency) {
        String user = Util.getUser(token);
        dependencyService.update(user, dependency);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    void create(JwtAuthenticationToken token, @RequestBody Dependency dependency) {
        String user = Util.getUser(token);
        dependencyService.create(user, dependency);
    }

}
