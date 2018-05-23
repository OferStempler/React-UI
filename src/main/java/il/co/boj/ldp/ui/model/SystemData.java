package il.co.boj.ldp.ui.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SystemData {

    String user;
    Boolean production;
    String serverName;
    Boolean admin;
    String engineServerUrl;
}
