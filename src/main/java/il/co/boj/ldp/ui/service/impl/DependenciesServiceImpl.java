package il.co.boj.ldp.ui.service.impl;

import il.co.boj.ldp.ui.service.CustomSequencesService;
import il.co.boj.ldp.ui.service.DependencyService;
import il.co.boj.ldp.ui.dao.DependencyRepository;
import il.co.boj.ldp.ui.model.Dependency;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.List;
@Service
public class DependenciesServiceImpl implements DependencyService {

	@Autowired
	DependencyRepository dependencyRepository;

	@Autowired
	CustomSequencesService systemConfigService;

	@Override
	public void update(String user, Dependency dependency) {
		dependencyRepository.save(dependency);
	}

	@Override
	public void create(String user, Dependency dependency) {
		if(StringUtils.isEmpty(dependency.getId())){
			dependency.setDependencyId(systemConfigService.generateNextServiceId());
		}
		dependencyRepository.save(dependency);
	}

	@Override
	public void deleteById(String user, String id) {
		dependencyRepository.delete(id);
	}

	@Override
	public Dependency findById(String user, String id) {
		return dependencyRepository.findOne(id);
	}

	@Override
	public List<Dependency> findAll(String user) {
		return dependencyRepository.findAll(new Sort(Sort.Direction.ASC, "name"));
	}
}
