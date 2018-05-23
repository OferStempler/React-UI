package il.co.boj.ldp.ui.model;

/**
 * Created by ofer on 24/01/18.
 */
import lombok.Data;
import lombok.ToString;

import java.util.List;
@Data
@ToString
public class AllDataBase {


    List<Dependency> dependencyList;
    List<RegularExpressions> regexList;
    List<Schemas> schemaList;
    List<ServiceRegularExpressions> serviceRegexList;
    List<ServiceDependencies> serviceDependenciesList;
    List<Services> servicesList;
    List<ServiceConversions> serviceConversionsList;
    List<ServiceReplacements> serviceReplacementsList;
    List<ServiceParams> serviceParamsList;


}