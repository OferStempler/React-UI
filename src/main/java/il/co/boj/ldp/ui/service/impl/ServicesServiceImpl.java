package il.co.boj.ldp.ui.service.impl;

import il.co.boj.ldp.ui.dao.*;
import il.co.boj.ldp.ui.model.*;
import il.co.boj.ldp.ui.service.ServicesService;
import il.co.boj.ldp.ui.service.CustomSequencesService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.List;

@Service
@Log4j
public class ServicesServiceImpl implements ServicesService {

    @Autowired
    ServiceRepository serviceRepo;

    @Autowired
    CustomSequencesService systemConfigService;

    @Autowired
    ServiceRegexRepository serviceRegexRepository;

    @Autowired
    SchemasRepository schemasRepository;

    @Autowired
    private RegexRepository regexRepository;

    @Autowired
    DependencyRepository dependencyRepository;

    @Autowired
    ServiceDependenciesRepository serviceDependenciesRepository;

    @Autowired
    ServiceConversionsRepository serviceConversionsRepository;

    @Override
    public void update(String user, Services services) {
        services.setUpdated(new Date());
        services.setUpdatedBy(user);
        serviceRepo.save(services);
        saveConversions(services);
    }

    @Override
    public void create(String user, Services services) {
        if(StringUtils.isEmpty(services.getId())){
            services.setServiceId(systemConfigService.generateNextServiceId());
        }
        services.setCreated(new Date());
        services.setCreatedBy(user);
        services.setUpdated(services.getCreated());
        services.setUpdatedBy(user);
        serviceRepo.save(services);
        saveConversions(services);
    }


    private void saveConversions( Services services){
        ServiceConversions sc = services.getServiceConversions();
        serviceConversionsRepository.deleteByServiceId(services.getServiceId());
        if("COMPOSITE".equalsIgnoreCase(services.getContentType()) && sc != null &&
                !StringUtils.isEmpty(sc.getDestinationRequestInputType()) &&
                !StringUtils.isEmpty(sc.getDestinationResponseInputType()) &&
                !StringUtils.isEmpty(sc.getSourceRequestInputType()) &&
                !StringUtils.isEmpty(sc.getSourceResponseInputType())){
            sc.setServiceId(services.getServiceId());
            serviceConversionsRepository.save(sc);
        }

    }

    @Override
    public void deleteById(String user, String id) {
        serviceRepo.delete(id);
    }

    @Override
    public ServiceData findById(String user, String id) {
        ServiceData serviceData = new ServiceData();
        Services services = serviceRepo.findOne(id);
        if(services != null) {
            serviceData.setService(services);
            serviceData.setServiceRegularExpressions(serviceRegexRepository.findByServiceIdAndRegexIdNotNull(services.getServiceId()));
            serviceData.getServiceRegularExpressions().forEach(serviceRegularExpressions -> {
                RegularExpressions regularExpressions = regexRepository.findByRegexId(serviceRegularExpressions.getRegexId());
                if(regularExpressions != null){
                    serviceRegularExpressions.setName(regularExpressions.getName());
                }
            });

            serviceData.setServiceSchemas(schemasRepository.findByServiceId(services.getServiceId()));

            serviceData.setServiceDependencies(serviceDependenciesRepository.findByServiceId(services.getServiceId()));
            serviceData.getServiceDependencies().forEach(serviceDependencies -> {
                Dependency dependency = dependencyRepository.findByDependencyId(serviceDependencies.getDependencyId());
                if(dependency != null){
                    serviceDependencies.setName(dependency.getName());
                }
            });
            services.setServiceConversions(serviceConversionsRepository.findFirstByServiceId(services.getServiceId()));
        }
        return serviceData;
    }

    @Override
    public List<Services> findAll(String user) {
        List<Services> services =  serviceRepo.findAll(new Sort(Sort.Direction.ASC, "serviceName"));
        return services;
    }


}
