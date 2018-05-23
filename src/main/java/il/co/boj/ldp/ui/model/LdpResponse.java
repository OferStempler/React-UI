package il.co.boj.ldp.ui.model;

/**
 * Created by ofer on 12/03/18.
 */
import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LdpResponse {
    protected HttpStatus responseCode;
    protected String responseMessage;

}
