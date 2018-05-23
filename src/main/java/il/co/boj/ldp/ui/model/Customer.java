package il.co.boj.ldp.ui.model;

import lombok.Data;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

/**
 * Created by ofer on 09/04/18.
 */
@Data
@ToString
@Document(collection = "customers")
public class Customer {

    @Id
    private String id;
    Integer customerId;
    private String name;
    private String serialNumber;
    private String publickey;
    private String o;
    private String ou;
    private String cn;
}
