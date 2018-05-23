package il.co.boj.ldp.ui.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

/**
 * Created by ofer on 09/04/18.
 */
@Data
@Document(collection = "serviceCustomers")
public class ServiceCustomers {

    @Id
    private String id;
    private Integer customerId;
    private Integer serviceId;
}
