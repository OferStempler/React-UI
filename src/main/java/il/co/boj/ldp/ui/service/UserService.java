package il.co.boj.ldp.ui.service;

import il.co.boj.ldp.ui.model.User;
import il.co.boj.ldp.ui.security.auth.JwtAuthenticationToken;

import java.util.List;


public interface UserService {
    User getByUsername(String username);

    List<String> getUserRoles(String username);

    User getUser(JwtAuthenticationToken token);

    String updatePassword(String user, String currentPassword, String newPassword);

    String update(String username, User user);

    String create(String username, User user);

    String deleteById(String user, String id);

    User findById(String user, String id);

    List<User> findAll(String user);

    User findByUserName(String user);
}
