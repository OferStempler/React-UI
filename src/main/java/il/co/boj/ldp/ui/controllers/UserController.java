package il.co.boj.ldp.ui.controllers;


import il.co.boj.ldp.ui.model.User;
import il.co.boj.ldp.ui.model.UserPasswordData;
import il.co.boj.ldp.ui.security.auth.JwtAuthenticationToken;
import il.co.boj.ldp.ui.service.UserService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/users")
@Log4j
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(value = "/updateUserPassword", method = RequestMethod.PUT)
    ResponseEntity<String> updateUserPassword(@RequestBody UserPasswordData update, JwtAuthenticationToken token) {
        String user = Util.getUser(token);
        String result = userService.updatePassword(user, update.getCurrentPassword(), update.getNewPassword());
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    List<User> get(JwtAuthenticationToken token) {
        String user = Util.getUser(token);
        return userService.findAll(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    User getById(JwtAuthenticationToken token, @PathVariable(value = "id") String id) {
        String user = Util.getUser(token);
        return userService.findById(user, id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    String deleteById(JwtAuthenticationToken token, @PathVariable(value = "id") String id) {
        String user = Util.getUser(token);
        return userService.deleteById(user, id);
    }

    @RequestMapping(value = "/", method = RequestMethod.PUT)
    String update(JwtAuthenticationToken token, @RequestBody User user) {
        String username = Util.getUser(token);
        return userService.update(username, user);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    String create(JwtAuthenticationToken token, @RequestBody User user) {
        String username = Util.getUser(token);
        return userService.create(username, user);
    }
}
