package il.co.boj.ldp.ui.service.impl;

import il.co.boj.ldp.ui.dao.RegexRepository;
import il.co.boj.ldp.ui.model.Dependency;
import il.co.boj.ldp.ui.model.RegularExpressions;
import il.co.boj.ldp.ui.model.ServiceDependencies;
import il.co.boj.ldp.ui.service.ServiceRegexService;
import il.co.boj.ldp.ui.dao.ServiceRegexRepository;
import il.co.boj.ldp.ui.model.ServiceRegularExpressions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ServiceRegexServiceImpl implements ServiceRegexService {

	@Autowired
	ServiceRegexRepository serviceRegexRepository;

	@Autowired
	private RegexRepository regexRepository;
	@Override
	public ServiceRegularExpressions update(String user, ServiceRegularExpressions regularExpression) {
		return setName(serviceRegexRepository.save(regularExpression));
	}

	private ServiceRegularExpressions setName(ServiceRegularExpressions regularExpression){
		RegularExpressions regularExpressions = regexRepository.findByRegexId(regularExpression.getRegexId());
		if(regularExpressions != null){
			regularExpression.setName(regularExpressions.getName());
		}
		return regularExpression;
	}

	@Override
	public ServiceRegularExpressions create(String user, ServiceRegularExpressions regularExpression) {
		return setName(serviceRegexRepository.save(regularExpression));
	}

	@Override
	public String deleteById(String user, String id) {
		serviceRegexRepository.delete(id);
		return id;
	}
}
