package il.co.boj.ldp.ui.model;

import lombok.Data;

import java.util.List;

@Data
public class ServiceData {
    Services service;
    List<ServiceRegularExpressions> serviceRegularExpressions;
    List<Schemas> serviceSchemas;
    List<ServiceDependencies> serviceDependencies;

}
