package il.co.boj.ldp.ui.service;

import il.co.boj.ldp.ui.model.Dependency;

import java.util.List;

public interface DependencyService {
//Dependency dependency
	//------GET

	void update(String user, Dependency dependency);
	void create(String user, Dependency dependency);
	void deleteById(String user, String id);
	Dependency findById(String user, String id);
	List<Dependency> findAll(String user);
}
