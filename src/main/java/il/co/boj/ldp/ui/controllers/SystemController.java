package il.co.boj.ldp.ui.controllers;


import il.co.boj.ldp.ui.configuration.LdpUISettings;
import il.co.boj.ldp.ui.model.SystemData;
import il.co.boj.ldp.ui.model.User;
import il.co.boj.ldp.ui.security.auth.JwtAuthenticationToken;
import il.co.boj.ldp.ui.service.UserService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/system")
@Log4j
public class SystemController {

    @Autowired
    LdpUISettings ldpUISettings;

    @Autowired
    UserService userService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    SystemData systemData(JwtAuthenticationToken token) {
        String user = Util.getUser(token);
        User currentUser = userService.findByUserName(user);
        SystemData data = SystemData.builder()
                .user(user)
                .serverName(ldpUISettings.getServerName())
                .production(ldpUISettings.getProduction())
                .admin(currentUser.getAdmin())
                .engineServerUrl(ldpUISettings.getReloadUrlFromLdp())
                .build();

        return data;
    }
}
