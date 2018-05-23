package il.co.boj.ldp.ui.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.persistence.Id;

@Data
@Document (collection = "serviceParams")
public class ServiceParams {

    @Id
    String id;
    int serviceId;
    boolean digSigCRLChk;
    boolean saveFileExt;
    String sanitizeMode; //Votiro/Jpeg/SASA
}
