package il.co.boj.ldp.ui.dao;

import il.co.boj.ldp.ui.model.RegularExpressions;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegexRepository extends MongoRepository<RegularExpressions, String>{

    List<RegularExpressions> findAllByRegexIdNotNull(Sort sort);
    RegularExpressions findByRegexId(Integer regexId);

}
