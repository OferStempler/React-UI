package il.co.boj.ldp.ui.service.impl;

import il.co.boj.ldp.ui.configuration.LdpUISettings;
import il.co.boj.ldp.ui.dao.UserRepository;
import il.co.boj.ldp.ui.model.ServiceData;
import il.co.boj.ldp.ui.model.User;
import il.co.boj.ldp.ui.security.auth.JwtAuthenticationToken;
import il.co.boj.ldp.ui.security.model.UserContext;
import il.co.boj.ldp.ui.service.UserService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Log4j
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    private MongoOperations mongo;
    @Autowired
    LdpUISettings ldpUISettings;

    String OK = "OK";
    String UNAUTHORIZED = "Unauthorized";
    String USERNAME_ALREADY_EXISTS = "Username already exists";
    String NEW_PASSWORD_INVALID;
    String PASSWORD_INVALID;
    @PostConstruct
    void init(){
        if(userRepository.count() == 0){
            User user = new User();
            user.setPassword("admin");
            user.setUsername("admin");
            user.setAdmin(true);
            userRepository.save(user);
        }
        NEW_PASSWORD_INVALID = "New password invalid " + ldpUISettings.getPasswordPattern();
        PASSWORD_INVALID = "Password invalid " + ldpUISettings.getPasswordPattern();
    }
    @Override
    public User getByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return user;
    }

    @Override
    public List<String> getUserRoles(String username) {
        return Arrays.asList("ldp");
    }

    @Override
    public User getUser(JwtAuthenticationToken token) {
        UserContext p = (UserContext) token.getPrincipal();
        String username = p.getUsername();
        return getByUsername(username);
    }

    @Override
    public String updatePassword(String username, String currentPassword, String newPassword) {
//        Query query = new Query();
//        query.addCriteria(Criteria.where("username").is(username));
//        User user = mongo.findOne(query, User.class);
        User user = userRepository.findByUsername(username);
        if(user == null){
            return "User not found";
        }
        else if(!user.getPassword().equalsIgnoreCase(currentPassword)){
            return "Current password invalid";
        }
        else if(!validatePassword(newPassword)){
            return NEW_PASSWORD_INVALID;
        }
        else if(user.getPassword().equalsIgnoreCase(newPassword)){
            return "New password identical";
        }

//        Update update = new Update();
//        update.set("password", newPassword);

       // mongo.updateFirst(query, update, User.class);
        user.setPassword(newPassword);
        userRepository.save(user);

        return OK;
    }

    @Override
    public String update(String username, User user) {
        User admin = getByUsername(username);
        if(admin.getAdmin()) {
            if(!validatePassword(user.getPassword())) {
                return PASSWORD_INVALID;
            }
            userRepository.save(user);
            return OK;
        }
        return UNAUTHORIZED;
    }

    @Override
    public String create(String username, User user) {
        User admin = getByUsername(username);
        if(admin.getAdmin()) {
            if(getByUsername(user.getUsername()) != null){
                return USERNAME_ALREADY_EXISTS;
            }
            if(!validatePassword(user.getPassword())) {
                return PASSWORD_INVALID;
            }
            userRepository.save(user);
            return OK;
        }
        return UNAUTHORIZED;

    }

    @Override
    public String deleteById(String username, String id) {
        User user = getByUsername(username);
        if(user.getAdmin()) {
            userRepository.delete(id);
            return OK;
        }
        return UNAUTHORIZED;
    }

    @Override
    public User findById(String username, String id) {
        User user = getByUsername(username);
        if(user.getAdmin()) {
            return userRepository.findOne(id);
        }
        return user;
    }

    @Override
    public List<User> findAll(String username) {
        User user = getByUsername(username);
        List<User> result = new ArrayList<>();
        if(user.getAdmin()) {
            result = userRepository.findAllByUsernameNotOrderByUsername(username);
        }
        return result;
    }

    @Override
    public User findByUserName(String username) {
        return getByUsername(username);
    }

    private boolean validatePassword(String password) {
        if(StringUtils.isEmpty(password)){
            return false;
        }
        boolean ok =  password.matches(ldpUISettings.getPasswordPattern());
        return ok;

    }
}
