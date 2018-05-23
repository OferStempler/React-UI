package il.co.boj.ldp.ui.dao;

import il.co.boj.ldp.ui.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User findByUsername(String username);
    List<User> findAllByUsernameNotOrderByUsername(String username);
}
