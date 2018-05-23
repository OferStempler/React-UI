package il.co.boj.ldp.ui.dao;

import il.co.boj.ldp.ui.model.CustomSequences;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomSequencesRepository extends MongoRepository<CustomSequences, String> {
}
