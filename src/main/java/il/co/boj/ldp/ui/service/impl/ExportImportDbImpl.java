package il.co.boj.ldp.ui.service.impl;

/**
 * Created by ofer on 24/01/18.
 */
import il.co.boj.ldp.ui.configuration.LdpUISettings;
import il.co.boj.ldp.ui.dao.*;
import il.co.boj.ldp.ui.model.*;
import il.co.boj.ldp.ui.service.ExportImportDb;
import lombok.extern.log4j.Log4j;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
@Service
@Log4j
public class ExportImportDbImpl implements ExportImportDb {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private SchemasRepository schemaRepository;

    @Autowired
    private ServiceDependenciesRepository serviceDependenciesRepositroy;

    @Autowired
    private ServiceRegexRepository serviceRegexRepository;

    @Autowired
    private RegexRepository regexRepository;

    @Autowired
    private DependencyRepository dependenciesRepo;

	@Autowired
    LdpUISettings ldpUISettings;

	@Autowired
    private ServiceConversionsRepository serviceConversionRepo;

	@Autowired
    private  ServiceReplacementsRepository serviceReplacementsRepo;

	@Autowired
    private ServiceParamsRepository serviceParamsRepository;



    @Override
    public String exportEntireDb() {
        //export all db to json
        AllDataBase allData = new AllDataBase();
        allData.setDependencyList(dependenciesRepo.findAll());
        allData.setRegexList(regexRepository.findAll());
        allData.setSchemaList(schemaRepository.findAll());
        allData.setServiceDependenciesList(serviceDependenciesRepositroy.findAll());
        allData.setServiceRegexList(serviceRegexRepository.findAll());
        allData.setServicesList(serviceRepository.findAll());
        allData.setServiceConversionsList(serviceConversionRepo.findAll());
        allData.setServiceReplacementsList(serviceReplacementsRepo.findAll());
        allData.setServiceParamsList(serviceParamsRepository.findAll());
        log.debug("Successfully built allData object with all db content. Converting to json String");
        return mapObectToJsonString(allData);
    }

    @Override
    public ImportExportResponse importDb(String data) {

        if (data == null ) {
            String error = "Data string is null. Aborting import";
            log.error(error);
            return responseAndAudit( error);
        }
        log.debug("Starting dataBase import.");

        try {
            // build AllDataBase from file
            AllDataBase allDataBase = buildContent(data);

            for (Services service : allDataBase.getServicesList()) {
                Services dbService = serviceRepository.findByServiceName(service.getServiceName());
                // validate serviceId before saving
                boolean ok = validateServiceIdAndSave(service, dbService);
                if (!ok) {
                    String error = "Found same serviceName with different serviceId. Each serviceId is unique and should be the same througout all LDPs Dbs. Aborting import";
                    log.error(error);
                    return responseAndAudit( error);
                }
                log.debug("Deleting all service dependent entities from db");
                deleteServiceDependedEntites(service);
                log.debug("Successfully deleted all service dependent entities from db for [" + service.getServiceName()+ "]");
            }

            log.debug("Inserting all new dependencies from file");
            insertNewData(allDataBase);
            log.debug("Successfully inserted all new data from file to db. Returning success");

        } catch (Exception e) {
            String error = "Could not import Database. Make sure file is in a valid json form. " + e;
            log.error(error);
            return responseAndAudit( error);
        }
        return responseAndAudit( null);
    }



    private void insertNewData(AllDataBase allDataBase) throws Exception {
        int counter = 0;
//        allDataBase.getServiceReplacementsList().forEach(serviceReplacements->{serviceReplacementsRepo.save(serviceReplacements);});
        for (ServiceReplacements serviceReplacements : allDataBase.getServiceReplacementsList()){
            serviceReplacementsRepo.save(serviceReplacements);
            counter++;
        }
        log.debug("Successfully inserted [" + counter + "] new ServiceReplacements");
        counter = 0;

        for (ServiceConversions serviceConversion : allDataBase.getServiceConversionsList()){
            serviceConversionRepo.save(serviceConversion);
            counter++;
        }
        log.debug("Successfully inserted [" + counter + "] new serviceConversions");
        counter = 0;

        for (Schemas newSchema : allDataBase.getSchemaList()) {
            schemaRepository.save(newSchema);
            counter++;
        }
        log.debug("Successfully inserted [" + counter + "] new schmeas");
        counter = 0;

        for (ServiceRegularExpressions servicesRegex : allDataBase.getServiceRegexList()) {
            serviceRegexRepository.save(servicesRegex);
            counter++;
        }
        log.debug("Successfully inserted [" + counter + "] new servicesRegexes");
        counter = 0;
        for (ServiceDependencies serviceDependency : allDataBase.getServiceDependenciesList()) {
            serviceDependenciesRepositroy.save(serviceDependency);
            counter++;
        }
        log.debug("Successfully inserted [" + counter + "] new serviceDependencies");
        counter = 0;

        log.debug("Removing all Dependencies and inserting new ones from file");
        counter = 0;
        dependenciesRepo.deleteAll();
        for (Dependency dependency : allDataBase.getDependencyList()) {
            dependenciesRepo.save(dependency);
            counter++;
        }
        log.debug("Successfully inserted [" + counter + "] new Dependencies from file");

        log.debug("Removing all Regexes and inserting new ones from file");
        counter = 0;
        regexRepository.deleteAll();
        for (RegularExpressions regex : allDataBase.getRegexList()) {
            regexRepository.save(regex);
            counter++;
        }
        log.debug("Successfully inserted [" + counter + "] new Regexes from file");

    }

    private void deleteServiceDependedEntites(Services service) throws Exception{
        List<Schemas> serviceSchemasList                  = new ArrayList<Schemas>();
        List<ServiceDependencies> servicesDepList         = new ArrayList<ServiceDependencies>();
        List<ServiceRegularExpressions> serviceRegexList  = new ArrayList<ServiceRegularExpressions>();
        List<ServiceConversions> serviceConversionList    = new ArrayList<>();
        List<ServiceReplacements> serviceReplacementsList = new ArrayList<>();
        int counter = 0;

        serviceReplacementsList = serviceReplacementsRepo.findByServiceId(service.getServiceId());
        for (ServiceReplacements serviceReplacements : serviceReplacementsList) {
            serviceReplacementsRepo.delete(serviceReplacements);
            counter++;
        }
        log.debug("Deleted [" + counter + "] existing ServiceReplacements for service");
        counter = 0;

        serviceConversionList = serviceConversionRepo.findByServiceId(service.getServiceId());
        for (ServiceConversions serviceConversion : serviceConversionList) {
            serviceConversionRepo.delete(serviceConversion);
            counter++;
        }
        log.debug("Deleted [" + counter + "] existing ServiceConversions for service");
        counter = 0;

        serviceSchemasList = schemaRepository.findByServiceId(service.getServiceId());
        for (Schemas serviceSchema : serviceSchemasList) {
            schemaRepository.delete(serviceSchema);
            counter++;
        }
        log.debug("Deleted [" + counter + "] existing schmeas for service");
        counter = 0;

        serviceRegexList = serviceRegexRepository.findByServiceIdAndRegexIdNotNull(service.getServiceId());
        counter = 0;
        for (ServiceRegularExpressions servicesRegex : serviceRegexList) {
            serviceRegexRepository.delete(servicesRegex);
            counter++;
        }
        log.debug("Deleted [" + counter + "] existing servicesRegexes for service");
        counter = 0;

        servicesDepList = serviceDependenciesRepositroy.findByServiceId(service.getServiceId());
        counter = 0;
        for (ServiceDependencies serviceDependency : servicesDepList) {
            serviceDependenciesRepositroy.delete(serviceDependency);
            counter++;
        }
        log.debug("Deleted [" + counter + "] existing serviceDependencies for service");
    }

    private boolean validateServiceIdAndSave(Services service, Services dbService) {
        log.debug("Validating that no other service exists with a different serviceId ["+service.getServiceId()+"]");
        if(dbService == null){
            log.debug("Service is new and does not exists in db. Saving to Db");
            serviceRepository.save(service);
            return true;
        }
        log.debug("Matching by service name, the service from db and the new service");
        if (dbService.getServiceId() == service.getServiceId()) {
            log.debug("Service name and service id match. Deleting old service and inserting new");
            serviceRepository.delete(dbService);
            serviceRepository.save(service);
            log.debug("Successfully saved service");
            return true;
        }
        return false;
    }

    private AllDataBase buildContent(String data) throws Exception {
        log.debug("Creating AllDataBase object from data String");
            ObjectMapper mapper = new ObjectMapper();
            // map the file content to object
            AllDataBase allDataBase = mapper.readValue(data, AllDataBase.class);
            log.debug("Successfully mapped file contnet to object");
            return allDataBase;
    }

    @Override
    public String exportByServiceId(List<Integer> serviceIds) {

        log.debug("Starting import for services Ids: [" +serviceIds.toString()+ "]");

        AllDataBase allData                                     = new AllDataBase();
        List<Services> allDbserviceList                         = new ArrayList<Services>();
        List<Schemas> allDbschemaList   						= new ArrayList<Schemas>();
        List<ServiceDependencies> allDbserviceDependenciesList  = new ArrayList<ServiceDependencies>();
        List<ServiceRegularExpressions> allDbserviceRegexList   = new ArrayList<ServiceRegularExpressions>();
        List<ServiceConversions> allServiceConversionList       = new ArrayList<>();
        List<ServiceReplacements> allServiceReplacementsList    = new ArrayList<>();
//		List<RegularExpressions> regexList                      = new ArrayList<RegularExpressions>();
//		List<Dependency> dependencyList                         = new ArrayList<Dependency>();

        if (serviceIds.size() > 0){
            for (Integer serviceId : serviceIds) {

                List<Schemas> serviceSchemas                  = new ArrayList<Schemas>();
                List<ServiceDependencies> servicesDep         = new ArrayList<ServiceDependencies>();
                List<ServiceRegularExpressions> serviceRegex  = new ArrayList<ServiceRegularExpressions>();
                List<ServiceConversions> serviceConversions   = new ArrayList<>();
                List<ServiceReplacements> serviceReplacements = new ArrayList<>();

                log.debug("Getting service for servicId [" +serviceId+"]");

                // find the service
                Services service = serviceRepository.findByServiceId(serviceId);
                if(service == null){
                    log.error("Could not find service for servicId [" +serviceId+"]. Aborting import ");
                    return null;
                }
                log.debug("Found Service: ["+service.toString()+"] ");
                // find all schemas associated with this serviceId
                serviceSchemas = schemaRepository.findByServiceId(serviceId);
                if (serviceSchemas == null || serviceSchemas.size() == 0){
                    log.debug("Did not find any schemas for service. ");
                } else {
                    log.debug("Found ["+serviceSchemas.size()+"] schemas for service");
                }
                // find all ServiceDependencies associated with this serviceId
                servicesDep = serviceDependenciesRepositroy.findByServiceId(serviceId);
                log.debug("Found ["+servicesDep.size()+"] service Dependencies for service");
                // find all ServiceRegularExpressions associated with this serviceId
                serviceRegex = serviceRegexRepository.findByServiceId(serviceId);
                log.debug("Found ["+serviceRegex.size()+"] serviceRegexes for service");

                // find all servoceCnoversion associated with this serviceId
                serviceConversions = serviceConversionRepo.findByServiceId(serviceId);
                log.debug("Found ["+serviceConversions.size()+"] serviceConversions for service");

                // find all serviceReplacements associated with this serviceId
                serviceReplacements = serviceReplacementsRepo.findByServiceId(serviceId);
                log.debug("Found ["+serviceReplacements.size()+"] serviceConversions for service");

                allDbserviceList.add(service);
                allDbschemaList.addAll(serviceSchemas);
                allDbserviceDependenciesList.addAll(servicesDep);
                allDbserviceRegexList.addAll(serviceRegex);
                allServiceConversionList.addAll(serviceConversions);
                allServiceReplacementsList.addAll(serviceReplacements);

            }
            //load the lists
            allData.setServicesList(allDbserviceList);
            allData.setSchemaList(allDbschemaList);
            allData.setServiceDependenciesList(allDbserviceDependenciesList);
            allData.setServiceRegexList(allDbserviceRegexList);
            allData.setServiceConversionsList(allServiceConversionList);
            allData.setServiceReplacementsList(allServiceReplacementsList);

            //Always get the whole tables for regexes, and dependencies
            allData.setDependencyList(dependenciesRepo.findAll());
            allData.setRegexList(regexRepository.findAll());
        } else {
            log.error("Did not get any Services Ids.");
            return null;
        }
        String data = null;
        ObjectMapper mapper = new ObjectMapper();
        log.debug("Successfully added all Data for wanted services. Mapping to json string");

        return mapObectToJsonString(allData);

    }

    private String mapObectToJsonString(AllDataBase allData) {
        String data = null;
        ObjectMapper mapper = new ObjectMapper();
        try {
            data = mapper.writeValueAsString(allData);
        }catch (Exception e) {
            String error = "Could not parse object to string";
            log.error(error);
            return error;
        }
        log.debug("Successfully created json string. Returning json");
        return data;
    }

    private ImportExportResponse responseAndAudit(String error) {
        ImportExportResponse response = new ImportExportResponse();

        if (error != null ) {
//			auditService.generalAudit(type, "FAILED", error);
            response.setSuccess(false);
            response.setResponseMessage(error);
            return response;

        } else {
//			auditService.generalAudit(type, "SUCCESS", error);
            response.setSuccess(true);
            response.setResponseMessage("Success");
        }
        return response;
    }

    public ImportExportResponse buildContentFromFile(MultipartFile attachmentFile)  {
        log.debug("Creating AllDataBase object from file");
        String fullDb = null;
        try {
            byte[] byteAyrr = attachmentFile.getBytes();
            InputStream fileInputStream = new ByteArrayInputStream(byteAyrr);
            BufferedReader b = new BufferedReader(new InputStreamReader(fileInputStream));
            StringBuilder builder = new StringBuilder();
            String line = null;
            while ((line = b.readLine()) != null) {
                builder.append(line);
            }
            fullDb = builder.toString();
            fileInputStream.close();
        }catch (Exception e){
            log.error("Could nor read file " + e);
            return null;
        }
        if (fullDb != null){
            return importDb(fullDb);
            // map the file content to object
//            ObjectMapper mapper = new ObjectMapper();
//            AllDataBase allDataBase = mapper.readValue(fullDb, AllDataBase.class);
//            log.debug("Successfully mapped file contnet to object");
//            return allDataBase;
        }
        return null;
    }
    @Override
    public ImportExportResponse reloadFromLdp() {
        RestTemplate template = new RestTemplate();
        String url = ldpUISettings.getReloadUrlFromLdp();
        log.debug("Sending request to LDP. url: [" +url+"]");

        ResponseEntity<String> response = template.getForEntity(url, String.class);
        String body = response.getBody();
        log.debug("Got response from LDP: [" +body+"]. Parsing String to object");

        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(body, ImportExportResponse.class);
        } catch (Exception e) {
            String error = "Could not send reload request to LDP app. " + e;
            ImportExportResponse importExportResponse = new ImportExportResponse();
            importExportResponse.setSuccess(false);
            importExportResponse.setResponseMessage(error);
            return importExportResponse;
        }
    }
}
