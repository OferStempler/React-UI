package il.co.boj.ldp.ui.dao;

import il.co.boj.ldp.ui.model.Schemas;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface SchemasRepository extends MongoRepository<Schemas, String> {

    List<Schemas> findByServiceId(Integer serviceId);
}
