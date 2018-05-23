package il.co.boj.ldp.ui.service;

import il.co.boj.ldp.ui.model.RegularExpressions;

import java.util.List;

public interface RegexService {

    void update(String user, RegularExpressions regEx);

    void create(String user, RegularExpressions regEx);

    boolean deleteById(String user, String id);

    RegularExpressions findById(String user, String id);

    List<RegularExpressions> findAll(String user);
}
