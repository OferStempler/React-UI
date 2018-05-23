package il.co.boj.ldp.ui.controllers;

import il.co.boj.ldp.ui.model.ServiceRegularExpressions;
import il.co.boj.ldp.ui.security.auth.JwtAuthenticationToken;
import il.co.boj.ldp.ui.service.SchemasService;
import il.co.boj.ldp.ui.model.Schemas;
import il.co.boj.ldp.ui.service.ServiceRegexService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController 
@RequestMapping (value = "/api/schemas")
@Log4j
public class SchemaController {

	@Autowired
    SchemasService schemaService;


	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	String deleteById(JwtAuthenticationToken token, @PathVariable(value = "id") String id) {
		String user = Util.getUser(token);
		return schemaService.deleteById(user, id);
	}

	@RequestMapping(value = "/", method = RequestMethod.PUT)
	Schemas update(JwtAuthenticationToken token, @RequestBody Schemas entity) {
		String user = Util.getUser(token);
		return schemaService.update(user, entity);
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	Schemas create(JwtAuthenticationToken token, @RequestBody Schemas entity) {
		String user = Util.getUser(token);
		return schemaService.create(user, entity);
	}
	
}
