package il.co.boj.ldp.ui.controllers;

/**
 * Created by ofer on 24/01/18.
 */

import il.co.boj.ldp.ui.model.ImportExportResponse;
import il.co.boj.ldp.ui.model.JsonRequestAndResponse;
import il.co.boj.ldp.ui.model.LdpResponse;
import il.co.boj.ldp.ui.model.MultiServiceDetailsResponse;
import il.co.boj.ldp.ui.security.auth.JwtAuthenticationToken;
import il.co.boj.ldp.ui.service.ExportImportDb;
import il.co.boj.ldp.ui.service.GetSchemasFromWSDL;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@Controller
@Log4j
@RequestMapping(value = "/api/db/")
public class ImportExportController {
    DateFormat dateFormat = new SimpleDateFormat("yyyy.MM.dd-HH.mm");

    @Autowired
    private ExportImportDb exportImportService;
    @Autowired
    private GetSchemasFromWSDL getSchamsService;


    @RequestMapping(path = "/exportAllDbToFile", method = RequestMethod.GET)
    public @ResponseBody
    ResponseEntity<Resource> exportDb(@RequestParam(value = "s", required = false) List<Integer> serviceIds,
                                      JwtAuthenticationToken token, HttpServletResponse response) throws IOException {
        String user = Util.getUser(token);
        log.debug("===============================");
        log.info("Exporting ALL db to file, user: " + user);
        String allData = null;
        if (CollectionUtils.isEmpty(serviceIds)) {
            allData = exportImportService.exportEntireDb();
        } else {
            allData = exportImportService.exportByServiceId(serviceIds);
        }
//        System.out.println(allData.substring(allData.length() -10));
        HttpHeaders headers = new HttpHeaders();
        Date date = new Date();
        String strDate = dateFormat.format(date);
        allData += ";";

        allData = new  String(allData.getBytes(), "utf-8");
        ////LDP exported JSON";
        ByteArrayResource resource = new ByteArrayResource(allData.getBytes());
        String fileName = "ldp-db-" + strDate + ".json";
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);
        log.info("allData Length:["  +  allData.length() + "]");
        log.info("resource.contentLength():["  +  resource.contentLength() + "]");

        headers.add("x-suggested-filename", fileName);
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(resource.contentLength())
                .body(resource);
    }
    //---------------------------------------------------------------------------------------------------------

    @RequestMapping(path = "/exportByServices", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    String exportByService(@RequestParam List<Integer> serviceIds) throws IOException {
        log.debug("===============================");
        log.debug("Exporting services to file. ");
        String allData = exportImportService.exportByServiceId(serviceIds);
        return allData;
    }
    //---------------------------------------------------------------------------------------------------------

    @RequestMapping(path = "/importDb", method = RequestMethod.POST)
    public @ResponseBody
    ImportExportResponse importDb(String data) throws IOException {
        log.debug("===============================");
        log.debug("Importing string data to db");
        return exportImportService.importDb(data);
    }

    //---------------------------------------------------------------------------------------------------------
    @RequestMapping(path = "/importDbFromFile", method = RequestMethod.POST)
    public @ResponseBody
    ImportExportResponse importDbFromMultiFile(@RequestParam("file") MultipartFile file, JwtAuthenticationToken token) throws IOException {
        String user = Util.getUser(token);
        log.debug("===============================");
        log.debug("Importing file to db. user: " + user);
        return exportImportService.buildContentFromFile(file);
    }
    //---------------------------------------------------------------------------------------------------------
    @RequestMapping (path = "/uiReload", method = RequestMethod.GET )
    public @ResponseBody ImportExportResponse uiReload (){
        log.debug("===============================");
        log.debug("Reloading db to LDP");
        ImportExportResponse response = null;
        try {
            response = exportImportService.reloadFromLdp();
        } catch (Exception e){
            e.printStackTrace();
            response = new ImportExportResponse();
            response.setSuccess(false);
            response.setResponseMessage("Server Internal Error: " + e.getClass().getSimpleName()+" - "+ e.getMessage());
        }
        log.debug("Returning response [" +response+"]");
        return response;
    }
    //---------------------------------------------------------------------------------------------------------
    /*  test adding schema:   http://localhost:8080/api/db/addXSD?WsdlURL=http://192.22.10.18:7001/JerusalemBank/ADA_Services/proxy_services/ArchiveData?wsdl&serviceId=5
    */
    @RequestMapping(value = "/addXSD", params  = {"WsdlURL", "serviceId"},  method = RequestMethod.GET,  produces = {"text/plain"})
    public @ResponseBody ResponseEntity<String> addToSchemas(@RequestParam("WsdlURL") String wsdlUri, @RequestParam("serviceId") int serviceId, HttpServletResponse response)    {
        log.debug("===============================");
        log.debug("Building XSDs and Regex from wsdl");
        LdpResponse ldpResponse = getSchamsService.getSchemasFromWSDL(wsdlUri, serviceId);
        return new ResponseEntity<String>(ldpResponse.getResponseMessage(), ldpResponse.getResponseCode());
    }
    //---------------------------------------------------------------------------------------------------------

    @RequestMapping(value = "/buildRegexFromJSON", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<String> buildRegexFromJSON( @RequestBody JsonRequestAndResponse requestAndResponse)    {
        log.debug("===============================");
        log.debug("Starting process Json Request and Response to Service Regex: [" + requestAndResponse +"]");
        LdpResponse ldpResponse =getSchamsService.buildRegexFromJson(requestAndResponse);
        return new ResponseEntity<String>(ldpResponse.getResponseMessage(), ldpResponse.getResponseCode());
    }
    //---------------------------------------------------------------------------------------------------------
    /*  test adding schema:   http://localhost:8080/api/db/addMultiServiceWsdl?WsdlURL=http://www.webservicex.net/geoipservice.asmx?WSDL
    //                        http://localhost:8080/api/db/addMultiServiceWsdl?WsdlURL=http://www.thomas-bayer.com/axis2/services/BLZService?wsdl
    */
    @RequestMapping(value = "/addMultiServiceWsdl", params  = {"WsdlURL"},  method = RequestMethod.GET)
    public @ResponseBody MultiServiceDetailsResponse addMultiServiceWsdl(@RequestParam("WsdlURL") String wsdlUri)    {
        log.debug("===============================");
        log.debug("Building XSDs and Regex from wsdl");
        MultiServiceDetailsResponse response = getSchamsService.getMultiServicesFromWsdl(wsdlUri);
        return response;
    }
}
