package il.co.boj.ldp.ui.service.impl;

import il.co.boj.ldp.ui.dao.ServiceRegexRepository;
import il.co.boj.ldp.ui.model.RegularExpressions;
import il.co.boj.ldp.ui.model.ServiceRegularExpressions;
import il.co.boj.ldp.ui.service.RegexService;
import il.co.boj.ldp.ui.dao.RegexRepository;
import il.co.boj.ldp.ui.service.CustomSequencesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.List;
@Service 
public class RegexServiceImpl implements RegexService {

	@Autowired
	RegexRepository regexRepository;

	@Autowired
	ServiceRegexRepository serviceRegexRepository;

	@Autowired
	CustomSequencesService systemConfigService;

	@Override
	public void update(String user, RegularExpressions regEx) {
		regexRepository.save(regEx);
	}

	@Override
	public void create(String user, RegularExpressions regEx)
	{
		if(StringUtils.isEmpty(regEx.getId())){
			regEx.setRegexId(systemConfigService.generateNextRegExId());
		}
		regexRepository.save(regEx);
	}

	@Override
	public boolean deleteById(String user, String id) {
		RegularExpressions regEx = regexRepository.findOne(id);
		if(regEx != null) {
			List<ServiceRegularExpressions> expressions = serviceRegexRepository.findByRegexId(regEx.getRegexId());
			if (CollectionUtils.isEmpty(expressions)) {
				regexRepository.delete(id);
				return true;
			}
		}
		return false;
	}

	@Override
	public RegularExpressions findById(String user, String id) {
		return regexRepository.findOne(id);
	}

	@Override
	public List<RegularExpressions> findAll(String user) {
		List<RegularExpressions> regularExpressionsList = regexRepository.findAllByRegexIdNotNull(new Sort(Sort.Direction.ASC, "name"));
		return regularExpressionsList;
	}
}
