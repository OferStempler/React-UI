package il.co.boj.ldp.ui.service.impl;

import il.co.boj.ldp.ui.service.SchemasService;
import il.co.boj.ldp.ui.dao.SchemasRepository;
import il.co.boj.ldp.ui.model.Schemas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SchemaServiceImpl implements SchemasService {

	@Autowired
	SchemasRepository schemasRepository;

	@Override
	public Schemas update(String user, Schemas entity) {
		return schemasRepository.save(entity);
	}

	@Override
	public Schemas create(String user, Schemas entity) {
		return schemasRepository.save(entity);
	}

	@Override
	public String deleteById(String user, String id) {
		schemasRepository.delete(id);
		return id;
	}
}
