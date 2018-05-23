package il.co.boj.ldp.ui.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
@Data
@Document (collection = "dependencies")
public class Dependency {

	@Id
	private String id;
	private Integer dependencyId;
	private String name;
	
	
	
}
