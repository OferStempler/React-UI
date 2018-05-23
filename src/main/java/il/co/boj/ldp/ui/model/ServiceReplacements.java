package il.co.boj.ldp.ui.model;

/**
 * Created by ofer on 22/02/18.
 */
import lombok.Data;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Data
@ToString
@Document (collection = "serviceReplacments")
public class ServiceReplacements {

    @Id
    private String id;
    private int serviceId;
    private String messageType;
    private String field;
    private String from;
    private String to;
    private String replacementValue;





}