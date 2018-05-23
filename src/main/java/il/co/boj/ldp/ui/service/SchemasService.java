package il.co.boj.ldp.ui.service;

import il.co.boj.ldp.ui.model.Schemas;

public interface SchemasService {

    Schemas update(String user, Schemas entity);

    Schemas create(String user, Schemas entity);

    String deleteById(String user, String id);
}
