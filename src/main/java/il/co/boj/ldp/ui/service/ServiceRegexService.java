package il.co.boj.ldp.ui.service;

import il.co.boj.ldp.ui.model.ServiceRegularExpressions;
import org.springframework.stereotype.Service;

@Service
public interface ServiceRegexService {

    ServiceRegularExpressions update(String user, ServiceRegularExpressions regularExpression);

    ServiceRegularExpressions create(String user, ServiceRegularExpressions regularExpression);

    String deleteById(String user, String id);
}
