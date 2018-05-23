package il.co.boj.ldp.ui.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import javax.persistence.Transient;

@Data
@Document (collection = "servicesDependencies")
public class ServiceDependencies {

	@Id
	private String id;
	private Integer serviceId;
	private String messageType;
	private Integer dependencyId;
	private String dependencyValue;
	private Integer enabled;
	@Transient
	private String name;
}
