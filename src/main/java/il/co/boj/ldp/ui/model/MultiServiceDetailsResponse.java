package il.co.boj.ldp.ui.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.List;

/**
 * Created by ofer on 21/03/18.
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MultiServiceDetailsResponse {

    HttpStatus responseCode;
    String responseMessage;
    String wsdlUrl;
    List<ServiceRegexDetails> serviceRegexDetails;

}
