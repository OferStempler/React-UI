package il.co.boj.ldp.ui.dao;

import il.co.boj.ldp.ui.model.Dependency;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DependencyRepository extends MongoRepository<Dependency, String> {

    Dependency findByDependencyId(Integer dependencyId);

}
