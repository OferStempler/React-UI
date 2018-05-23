package il.co.boj.ldp.ui.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "ldp")
@Data
public class LdpUISettings {
    Boolean production;
    String serverName;
    String passwordPattern;
    String reloadUrlFromLdp;
}
