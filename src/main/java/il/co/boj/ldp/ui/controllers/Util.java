package il.co.boj.ldp.ui.controllers;

import il.co.boj.ldp.ui.security.auth.JwtAuthenticationToken;
import il.co.boj.ldp.ui.security.model.UserContext;

public class Util {

    public static String getUser(JwtAuthenticationToken token) {
        UserContext p = (UserContext) token.getPrincipal();
        String username = p.getUsername();
        return username;
    }
}
