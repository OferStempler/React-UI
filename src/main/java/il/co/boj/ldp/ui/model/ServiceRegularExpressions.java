package il.co.boj.ldp.ui.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import javax.persistence.Transient;

@Data
@Document (collection = "serviceRegularExpressions")
public class ServiceRegularExpressions {
	
	@Id
	private String id;
	private Integer serviceId;
	private String messageType;
	private String element;
	private Integer regexId;
	private Integer enabled;
	@Transient
	private String name;
	
}
