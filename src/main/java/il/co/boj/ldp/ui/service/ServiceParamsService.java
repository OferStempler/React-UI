package il.co.boj.ldp.ui.service;

import il.co.boj.ldp.ui.model.ServiceParams;

import java.util.List;

/**
 * Created by ofer on 14/05/18.
 */
public interface ServiceParamsService {
    void update(String user, ServiceParams serviceParams);

    void create(String user, ServiceParams serviceParams);

    void deleteById(String user, String id);

    ServiceParams findById(String user, String id);

    List<ServiceParams> findAll(String user);
}
