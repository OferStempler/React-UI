package il.co.boj.ldp.ui.model;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import javax.persistence.Transient;
import java.util.Date;

@Data
@ToString
@Document (collection = "services")
public class Services {

	@Id
	private String id;
	private Integer serviceId;
	private String provider;
	private String consumer;
	private String uri;
	private String serviceName;
	private Integer forwardClientIp;
	private Integer enabled;
	private String contentType; //SOAP | XMLNOSOAP | JSON
	private String destinationType; // MQ | REST | WS
	private String serviceType;
	private String requestQueue;
	private String replyQueue;
	private Integer expiry;
	private Integer timeOut;
	private Integer persistence;
	private String destination;
	private Date created;
	private Date updated;
	private String createdBy;
	private String updatedBy;
	@Transient
	private ServiceConversions serviceConversions;

}
