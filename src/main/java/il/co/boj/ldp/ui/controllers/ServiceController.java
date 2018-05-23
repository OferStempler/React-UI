package il.co.boj.ldp.ui.controllers;

import il.co.boj.ldp.ui.model.ServiceData;
import il.co.boj.ldp.ui.model.Services;
import il.co.boj.ldp.ui.security.auth.JwtAuthenticationToken;
import il.co.boj.ldp.ui.service.ServicesService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/services")
@Log4j
public class ServiceController {

    @Autowired
    ServicesService servicesService;


//	@RequestMapping(value = "/{page}/{maxresult}", method = RequestMethod.GET)
//	Page<Services> get(JwtAuthenticationToken token, @PathVariable(value = "page") int page, @PathVariable(value = "maxresult") int maxresult, HttpServletRequest request, HttpServletResponse response) {
//		return servicesService.fin(Util.getUser(token), page, maxresult);
//	}


    @RequestMapping(value = "/", method = RequestMethod.GET)
    List<Services> get(JwtAuthenticationToken token) {
        String user = Util.getUser(token);
        return servicesService.findAll(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    ServiceData getById(JwtAuthenticationToken token, @PathVariable(value = "id") String id) {
        String user = Util.getUser(token);
        return servicesService.findById(user, id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    void deleteById(JwtAuthenticationToken token, @PathVariable(value = "id") String id) {
        String user = Util.getUser(token);
        servicesService.deleteById(user, id);
    }

    @RequestMapping(value = "/", method = RequestMethod.PUT)
    void update(JwtAuthenticationToken token, @RequestBody Services services) {
        String user = Util.getUser(token);
        servicesService.update(user, services);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    void create(JwtAuthenticationToken token, @RequestBody Services services) {
        String user = Util.getUser(token);
        servicesService.create(user, services);
    }
}
