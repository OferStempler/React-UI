package il.co.boj.ldp.ui.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

/**
 * Created by ofer on 18/02/18.
 */

@Data
@Document(collection = "serviceConversions")
public class ServiceConversions {


    @Id
    private String id;
    private int serviceId;
    //requ
    private String sourceRequestInputType;
    private String destinationRequestInputType;
    //res
    private String destinationResponseInputType;
    private String sourceResponseInputType;
    private int enabled;


}

