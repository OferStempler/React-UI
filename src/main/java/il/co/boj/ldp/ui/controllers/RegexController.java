package il.co.boj.ldp.ui.controllers;

import il.co.boj.ldp.ui.model.RegularExpressions;
import il.co.boj.ldp.ui.security.auth.JwtAuthenticationToken;
import il.co.boj.ldp.ui.service.RegexService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/regex")
@Log4j
public class RegexController {

	@Autowired
	RegexService service;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	List<RegularExpressions> get(JwtAuthenticationToken token) {
		String user = Util.getUser(token);
		return service.findAll(user);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	RegularExpressions getById(JwtAuthenticationToken token, @PathVariable(value = "id") String id) {
		String user = Util.getUser(token);
		return service.findById(user, id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	boolean deleteById(JwtAuthenticationToken token, @PathVariable(value = "id") String id) {
		String user = Util.getUser(token);
		return service.deleteById(user, id);
	}

	@RequestMapping(value = "/", method = RequestMethod.PUT)
	void update(JwtAuthenticationToken token, @RequestBody RegularExpressions RegularExpressions) {
		String user = Util.getUser(token);
		service.update(user, RegularExpressions);
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	void create(JwtAuthenticationToken token, @RequestBody RegularExpressions RegularExpressions) {
		String user = Util.getUser(token);
		service.create(user, RegularExpressions);
	}
	
}
