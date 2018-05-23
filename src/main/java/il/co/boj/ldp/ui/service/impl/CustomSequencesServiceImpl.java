package il.co.boj.ldp.ui.service.impl;

import il.co.boj.ldp.ui.dao.CustomSequencesRepository;
import il.co.boj.ldp.ui.dao.CustomerRepository;
import il.co.boj.ldp.ui.dao.RegexRepository;
import il.co.boj.ldp.ui.dao.ServiceRepository;
import il.co.boj.ldp.ui.model.CustomSequences;
import il.co.boj.ldp.ui.model.Customer;
import il.co.boj.ldp.ui.model.RegularExpressions;
import il.co.boj.ldp.ui.model.Services;
import il.co.boj.ldp.ui.service.CustomSequencesService;
import io.jsonwebtoken.lang.Collections;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Log4j
@Service
public class CustomSequencesServiceImpl implements CustomSequencesService {


    final String REGEX  = "regex";
    final String SERVICE = "service";
    final String DEPENDENCY = "dependency";
    final String CUSTOMER = "customer";

    @Autowired
    CustomSequencesRepository customSequencesRepository;

    @Autowired
    private MongoOperations mongo;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    RegexRepository regexRepository;

    @Autowired
    CustomerRepository customerRepository;

    private void initServiceIdSeq(){
        CustomSequences csSERVICE = customSequencesRepository.findOne(SERVICE);
        if(csSERVICE == null){
            csSERVICE = new CustomSequences();
            csSERVICE.setId(SERVICE);
            csSERVICE.setSeq(1);
        }

        Page<Services> page = serviceRepository.findAll(new PageRequest(0,1, Sort.Direction.DESC, "serviceId"));
        if(!Collections.isEmpty(page.getContent())){
            csSERVICE.setSeq(page.getContent().get(0).getServiceId());
        }
        customSequencesRepository.save(csSERVICE);
    }

    private void initRegExIdSeq(){
        CustomSequences csREGEX = customSequencesRepository.findOne(REGEX);
        if(csREGEX == null){
            csREGEX = new CustomSequences();
            csREGEX.setId(REGEX);
            csREGEX.setSeq(1);
        }

        Page<RegularExpressions> page = regexRepository.findAll(new PageRequest(0,1, Sort.Direction.DESC, "regexId"));
        if(!Collections.isEmpty(page.getContent())){
            csREGEX.setSeq(page.getContent().get(0).getRegexId());
        }
        customSequencesRepository.save(csREGEX);
    }

    private void initDependencyIdSeq(){
        CustomSequences csDEPENDENCY = customSequencesRepository.findOne(DEPENDENCY);
        if(csDEPENDENCY == null){
            csDEPENDENCY = new CustomSequences();
            csDEPENDENCY.setId(DEPENDENCY);
            csDEPENDENCY.setSeq(1);
        }

        Page<RegularExpressions> page = regexRepository.findAll(new PageRequest(0,1, Sort.Direction.DESC, "dependencyId"));
        if(!Collections.isEmpty(page.getContent())){
            csDEPENDENCY.setSeq(page.getContent().get(0).getRegexId());
        }
        customSequencesRepository.save(csDEPENDENCY);
    }

    private void initCustomerIdSeq(){
        CustomSequences csSERVICE = customSequencesRepository.findOne(CUSTOMER);
        if(csSERVICE == null){
            csSERVICE = new CustomSequences();
            csSERVICE.setId(CUSTOMER);
            csSERVICE.setSeq(1);
        }

        Page<Customer> page = customerRepository.findAll(new PageRequest(0,1, Sort.Direction.DESC, "customerId"));
        if(!Collections.isEmpty(page.getContent())){
            csSERVICE.setSeq(page.getContent().get(0).getCustomerId());
        }
        customSequencesRepository.save(csSERVICE);
    }
    @PostConstruct
    private void init(){
        initRegExIdSeq();
        initServiceIdSeq();
        initDependencyIdSeq();
        initCustomerIdSeq();
    }

    private int getNextSequence(String seqName) {
        CustomSequences counter = mongo.findAndModify(
                Query.query(Criteria.where("_id").is(seqName)),
                new Update().inc("seq", 1),
                FindAndModifyOptions.options().returnNew(true).upsert(true),
                CustomSequences.class);
        return counter.getSeq();
    }

    synchronized public Integer generateNextServiceId() {
        return getNextSequence(SERVICE);
    }

    @Override
    public Integer generateNextRegExId() { return getNextSequence(REGEX);

    }

    @Override
    public Integer generateNextDependency() {
        return getNextSequence(DEPENDENCY);
    }

    @Override
    public Integer generateNextCustomerId() { return getNextSequence(CUSTOMER); }
}
