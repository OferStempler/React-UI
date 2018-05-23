package il.co.boj.ldp.ui.controllers;

import il.co.boj.ldp.ui.model.ServiceRegularExpressions;
import il.co.boj.ldp.ui.security.auth.JwtAuthenticationToken;
import il.co.boj.ldp.ui.service.ServiceRegexService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/serviceRegex")
@Log4j
public class ServiceRegexController {

    @Autowired
    ServiceRegexService serviceRegexService;

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    String deleteById(JwtAuthenticationToken token, @PathVariable(value = "id") String id) {
        String user = Util.getUser(token);
        return serviceRegexService.deleteById(user, id);
    }

    @RequestMapping(value = "/", method = RequestMethod.PUT)
    ServiceRegularExpressions update(JwtAuthenticationToken token, @RequestBody ServiceRegularExpressions entity) {
        String user = Util.getUser(token);
        return serviceRegexService.update(user, entity);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    ServiceRegularExpressions create(JwtAuthenticationToken token, @RequestBody ServiceRegularExpressions entity) {
        String user = Util.getUser(token);
        return serviceRegexService.create(user, entity);
    }

}
