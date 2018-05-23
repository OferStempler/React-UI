package il.co.boj.ldp.ui.service;

import il.co.boj.ldp.ui.model.ServiceData;
import il.co.boj.ldp.ui.model.Services;

import java.util.List;

public interface ServicesService {


	void update(String user, Services services);
	void create(String user, Services services);
	void deleteById(String user, String id);
	ServiceData findById(String user, String id);
	List<Services> findAll(String user);
}
