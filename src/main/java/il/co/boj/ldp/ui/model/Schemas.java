package il.co.boj.ldp.ui.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
@Data
@Document (collection = "schemas")
public class Schemas {

	@Id 
	private String id;
	private String schemaType;
	private String schema;
	private Integer serviceId;
	
	

	
	
	
	
}
