package il.co.boj.ldp.ui.model;

/**
 * Created by ofer on 15/03/18.
 */
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
public class JsonRequestAndResponse {

    @JsonProperty("serviceId")
    private int serviceId;
    @JsonProperty("request")
    private Object request;
    @JsonProperty("response")
    private Object response;

}