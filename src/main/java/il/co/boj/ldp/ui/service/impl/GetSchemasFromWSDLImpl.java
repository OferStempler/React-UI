package il.co.boj.ldp.ui.service.impl;

/**
 * Created by ofer on 12/03/18.
 */
import com.eviware.soapui.impl.wsdl.WsdlInterface;
import com.eviware.soapui.impl.wsdl.WsdlOperation;
import com.eviware.soapui.impl.wsdl.WsdlProject;
import com.eviware.soapui.impl.wsdl.support.wsdl.WsdlImporter;
import com.eviware.soapui.model.iface.Operation;
import com.google.gson.Gson;
import il.co.boj.ldp.ui.dao.SchemasRepository;
import il.co.boj.ldp.ui.dao.ServiceRegexRepository;
import il.co.boj.ldp.ui.dao.ServiceRepository;
import il.co.boj.ldp.ui.model.*;
import il.co.boj.ldp.ui.model.enums.MessageTypes;
import il.co.boj.ldp.ui.model.enums.XSDType;
import il.co.boj.ldp.ui.service.GetSchemasFromWSDL;
import il.co.boj.ldp.ui.utils.Utils;
import lombok.extern.log4j.Log4j;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@Log4j
public class GetSchemasFromWSDLImpl implements GetSchemasFromWSDL {

    @Autowired
    SchemasRepository schemasRepo;
    @Autowired
    ServiceRepository serviceRepo;
    @Autowired
    ServiceRegexRepository serviceRegexRepo;

    static Set<Schemas> schemaList = new HashSet<Schemas>();
    final String MOCK_ROOT_ELEMENT = "RootElement";

    //-----------------------------------------------------------------------------------------------------------------------------
    public MultiServiceDetailsResponse getMultiServicesFromWsdl(String url){
        int counter = 0;
        boolean added = true;
        String error = "";
        MultiServiceDetailsResponse response = new MultiServiceDetailsResponse();
        response.setResponseCode(HttpStatus.OK);
        response.setResponseMessage("Success");

        added = this.getUrlContent(url);

        if (added) {
            // check that there are no prior xsds or wsdl for this service

            List<Schemas> TotalschemaList = new ArrayList<Schemas>();
            TotalschemaList = schemasRepo.findByServiceId(0);
            log.debug("Deleting ["+TotalschemaList.size()+"] existing schemas from db");
            if (TotalschemaList.size() !=0) {
                schemasRepo.findAll().forEach(schema -> {
                    if (schema.getServiceId() == 0) {
                        schemasRepo.delete(schema);
                    }
                });
            }

            for (Schemas schema : schemaList) {
                schemasRepo.save(schema);
                counter++;
            }
            log.debug("successfully added [" + counter + "] schemas");
            counter = 0;
            schemaList.clear();
            response = createMultiServiceDetailsResponse(url);

        } else {
            error = "No Schemas were added. Check logs for more details.";
            log.debug(error);
            response.setResponseCode(HttpStatus.CONFLICT);
            response.setResponseMessage(error);
            schemaList.clear();
        }
        return response;

    }
    //-----------------------------------------------------------------------------------------------------------------------------

    private MultiServiceDetailsResponse createMultiServiceDetailsResponse(String url) {
        log.debug("Starting to build multi Service detail response from wsdl");
        MultiServiceDetailsResponse multiServiceResponse = new MultiServiceDetailsResponse();
//        multiServiceResponse.setResponseCode(HttpStatus.OK);
//        multiServiceResponse.setResponseMessage("Success");
        multiServiceResponse.setWsdlUrl(url);
        List<ServiceRegexDetails> serviceRegexDetailsList = new ArrayList<>();
        String error = "";

        //build a wsdlProject from the com.smartbear.soapui dependency that relies on the smartbear repository.
        try {
            WsdlProject project  = new WsdlProject();
            WsdlInterface[] wsdls = WsdlImporter.importWsdl(project, url);
            WsdlInterface wsdl = wsdls[0];
            for (Operation operation : wsdl.getOperationList()) {
                List<Messages> messageList = new ArrayList<>();
                log.debug("found ["  +wsdl.getOperationList().size()+ "] services in Wsdl");
                WsdlOperation wsdlOperation = (WsdlOperation) operation;
                //build a request and a response based on the wsdl
                String request = wsdlOperation.createRequest(true);
                String response = (wsdlOperation.createResponse(true));

                log.debug("Operation name: "+wsdlOperation.getName());
                log.debug("Request:");
                log.debug(request);
                log.debug("Response:");
                log.debug(response);

                //Creat and save the serviceRegexes
                ServiceRegexDetails serviceRegexDetails = new ServiceRegexDetails();
                serviceRegexDetails.setServiceName(wsdlOperation.getName());
                messageList.add(buildServiceRegexDetails(request, MessageTypes.REQUEST.synonym));
                messageList.add(buildServiceRegexDetails(request, MessageTypes.RESPONSE.synonym));
                serviceRegexDetails.setMesasges(messageList);
                serviceRegexDetailsList.add(serviceRegexDetails);
                if(messageList.size() != 2){
                    error = "Could not build Regex from wsdl.";
                    log.error(error);
                    multiServiceResponse.setResponseCode(HttpStatus.CONFLICT);
                    multiServiceResponse.setResponseMessage(error);
                }

            }
        } catch (Exception e) {
            error = "Could not generate request or response for url [" +url+"]: " + e;
            log.error(error + e);
            multiServiceResponse.setResponseCode(HttpStatus.CONFLICT);
            multiServiceResponse.setResponseMessage(error);
        }

        multiServiceResponse.setServiceRegexDetails(serviceRegexDetailsList);


        return multiServiceResponse;
    }
    //-----------------------------------------------------------------------------------------------------------------------------
    private Messages buildServiceRegexDetails (String xml, String messageType ) throws Exception{
        String fieldStart = "#document.soapenv:Envelope.soapenv:";
        log.debug("Building Regex for ["+messageType+"]");
        Messages messages = new Messages();
        messages.setMessageType(messageType);
        List<String> elementList = new ArrayList<String>();
        XPath xPath = XPathFactory.newInstance().newXPath();
        String expression = "//*[not(*)]";
        Document doc = Utils.buildXML(xml);
        List<String> xPathList = new ArrayList<String>();
        NodeList nodeList = (NodeList) xPath.compile(expression).evaluate(doc, XPathConstants.NODESET);

        for (int i = 0; i < nodeList.getLength(); i++) {
            System.out.println(getXPath(nodeList.item(i)));
            xPathList.add(getXPath(nodeList.item(i)));
        }

        int counter =0;
        for (String current : xPathList) {
            //for Request
            if (current.contains("#document.soapenv:Envelope.soapenv:")) {
                String newString = current.substring(fieldStart.length());
                if (!elementList.contains(newString)) {
                    log.debug("Saving new element to messageList: [" + newString + "]");
                    elementList.add(newString);
//                        System.out.println(newString);
                    counter++;


                } else {
                    log.debug("elemnt [ " + newString + " ] already exists elementList");
                }
            }else {
                log.debug("Could not find Regex for field ["+current+"]");
            }
        }
        log.debug("Added ["+counter+ "] elements to service");
        messages.setFields(elementList);

        return messages;
    }

    //-----------------------------------------------------------------------------------------------------------------------------
//    public  List<String> wsdlToXSD(String sourceUrl) {
////        InputStream input = new URL(sourceUrl).openStream();
//        List<String> xsdList = new ArrayList<>();
//        String xml = "";
//        try {
//        URL url = new URL(sourceUrl);
//        InputStream is = url.openStream();
//        DocumentBuilder builder;
//
//            builder = getDocBuilder();
//            Document wsdlDoc = builder.parse(sourceUrl);
//            Document xsdDoc = getDocBuilder().newDocument();
//            String xsd = populateXsdDoc(wsdlDoc, xsdDoc);
//            xsdList.add(xsd);
//            writeToStream(xsdDoc);
//            is.close();
////            os.flush();
////            os.close();
//        } catch (Exception e) {
//            StringWriter sw = new StringWriter();
//            e.printStackTrace(new PrintWriter(sw));
//        }
//        return xsdList;
//    }
//    private  String populateXsdDoc(Document wsdlDoc, Document xsdDoc) {
//        Element root = xsdDoc.createElement("xsd:schema");
//        root.setAttribute("xmlns:xsd", "http://www.w3.org/2001/XMLSchema");
//        xsdDoc.appendChild(root);
//        Element element = wsdlDoc.getDocumentElement();
//        Node node = element.getElementsByTagName("wsdl:types").item(0);
//        NodeList lst = node.getChildNodes();
//        for (int i = 0; i < lst.getLength(); i++) {
//            Node nd = lst.item(i);
//            if(nd.getNodeName().equals("xsd:schema")){
//                NodeList xsdNodes = nd.getChildNodes();
//                for (int j = 0; j < xsdNodes.getLength(); j++) {
//                    Node temp = xsdNodes.item(j);
//                    Node toAdded = xsdDoc.importNode(temp, true);
//                    root.appendChild(toAdded);
//                }
//            }
//        }
//        return null;
//    }
//    private void writeToStream(Document document) throws IOException {
//        DOMImplementationLS domImplementationLS = (DOMImplementationLS) document.getImplementation();
//        LSSerializer lsSerializer = domImplementationLS.createLSSerializer();
//        String xsd = lsSerializer.writeToString(document);
//        log.debug(xsd);
////        PrintWriter pw = new PrintWriter(os);
////        pw.write(xsd);
////        pw.flush();
//    }
//    //-----------------------------------------------------------------------------------------------------------------------------
//    private static DocumentBuilder getDocBuilder() throws ParserConfigurationException{
//        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
//        DocumentBuilder builder = factory.newDocumentBuilder();
//        return builder;
//    }
    //-----------------------------------------------------------------------------------------------------------------------------
    @Override
    public LdpResponse getSchemasFromWSDL(String url, int serviceId) {
        int counter = 0;
        boolean added = true;
        String error = "";
        LdpResponse response = new LdpResponse();
        response.setResponseCode(HttpStatus.OK);
        response.setResponseMessage("Success");
        // make sure that there is a service with this serviceId
        // Services service =
        // serviceRepo.findByServiceId(Integer.parseInt(serviceId));
        // if (service == null){
        // added = false;
        // log.debug("There is no service with this ServiceId [" +serviceId+
        // "]");
        // return added;
        // }

        // get the wsdl and xsd onto the schemaList
        added = this.getUrlContent(url);

        if (added) {
            // check that there are no prior xsds or wsdl for this service
            List<Schemas> TotalschemaList = new ArrayList<Schemas>();
            TotalschemaList = schemasRepo.findByServiceId(serviceId);
            log.debug("Deleting [" +TotalschemaList.size()+"] existing schemas from db");
            schemasRepo.findAll().forEach(schema -> {
                if(schema.getServiceId() == serviceId){
                    schemasRepo.delete(schema);
                }
            });
//			int size = TotalschemaList.size();
//			if (size == 0 && size != -1) {
            // save the schemas
            for (Schemas schema : schemaList) {
                schema.setServiceId(serviceId);
                schemasRepo.save(schema);
                counter++;
            }
            log.debug("successfully added [" + counter + "] schemas");
            counter = 0;
            schemaList.clear();
            response = createServiceRegexes(url, serviceId);
//			}
//			error = "Some schemas already exists in DB for serviceId [" + serviceId
//					+ "]. No Schemas were added. Remove all schemas with this serviceId and try again";
//			log.debug(error);
//			response.setResponseCode(HttpStatus.CONFLICT);
//			response.setResponseMessage(error);
//			schemaList.clear();
        } else {
            error = "No Schemas were added. Check logs for more details.";
            log.debug(error);
            response.setResponseCode(HttpStatus.CONFLICT);
            response.setResponseMessage(error);
            schemaList.clear();
        }
        return response;
    }

    //-----------------------------------------------------------------------------------------------------------------------------

    private boolean getUrlContent(String sourceUrl){

        boolean ok = true;
        String xml = null;
        Schemas schema = new Schemas();
        try {

            // get URL content
            URL url = new URL(sourceUrl);
            URLConnection conn = url.openConnection();

            // open the stream and put it into BufferedReader
            BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream()));

            // build the content as a string
            StringBuilder builder = new StringBuilder();
            String line = null;
            while ((line = br.readLine()) != null) {
                builder.append(line);
            }
            xml = builder.toString();
            br.close();

            // add the Schema object to the achemaList with its proper attributes
            schema.setSchema(xml);
            if(sourceUrl.toLowerCase().endsWith("?wsdl")){
                log.debug("Adding WSDL schema type");
                //For testing
                schema.setSchemaType("XXX");
                schemaList.add(schema);

            } else {
                String targetNameSpace = xml.substring(xml.indexOf("targetNamespace"),  xml.indexOf("targetNamespace") + 65 );
                schema = findSchemaType(targetNameSpace, schema);
                schemaList.add(schema);
            }

//		if(sourceUrl.endsWith("?wsdl")){
//			schema.setSchemaType("WSDL");
//		} else {
//			schema.setSchemaType("XSD");
//		}
//		System.out.println(xml);

            //recursively look for more xsds
            this.getXmlDocument(xml);

        } catch (Exception e) {
            log.error("could not get url or parse content. " + e.getMessage(), e);

            return !ok;
        }

        return ok;
    }

    //-----------------------------------------------------------------------------------------------------------------------------

    private Schemas findSchemaType(String targetNameSpace, Schemas schema) {
        log.debug("Finding schema type according to first 'targerNameSpace'.");
        if (targetNameSpace != null){
            targetNameSpace = targetNameSpace.toLowerCase();

            if (targetNameSpace.contains("/reqh")){
                log.debug("Found '/reqh' - Updating schema type to:  REQUEST_HEADER");
                schema.setSchemaType(XSDType.REQUEST_HEADER.synonym);
            } else if (targetNameSpace.contains("/resh")){
                log.debug("Found '/resh' - Updating schema type to:  RESPONSE_HEADER");
                schema.setSchemaType(XSDType.RESPONSE_HEADER.synonym);
            } else if (targetNameSpace.contains("/general")){
                log.debug("Found '/general' - Updating schema type to:  GENERAL");
                schema.setSchemaType(XSDType.GENERAL.synonym);
            } else if (targetNameSpace.contains("/genericdata")){
                log.debug("Found '/genericData' - Updating schema type to:  GENERIC_DATA");
                schema.setSchemaType(XSDType.GENERIC_DATA.synonym);
            } else if (targetNameSpace.contains("/jerusalemservice/esb/com")){
                log.debug("Found /jerusalemservice/esb/com, and did not match all other types -  Updating schema type to: SERVICE");
                schema.setSchemaType(XSDType.SERVICE.synonym);
            } else {
                log.debug("DId not match any pattern - Updating schema type to: XSD1");
                schema.setSchemaType(XSDType.XSD1.synonym);
            }

        } else {
            log.debug("targetNamescpace is null or empty - Updating schema type to: XSD1");
            schema.setSchemaType(XSDType.XSD1.synonym);
        }
        return schema;
    }


    //-----------------------------------------------------------------------------------------------------------------------------
    private void getXmlDocument(String xml) throws Exception {

        //build Xml doc from string
        Document doc = Utils.buildXML(xml);
        doc.getDocumentElement().normalize();

        //check if the xml is WSDL or xsd:

        //for wsdl
        NodeList list = doc.getElementsByTagName("xsd:import");
        if (list.getLength() > 0) {
            for (int i = 0; i < list.getLength(); i++) {

                Element el = (Element) list.item(i);
                //get the url for the XSDs
                String s = el.getAttribute("schemaLocation");
                if (s != null) {
                    //get the xml content
                    this.getUrlContent(s);
                }
            }
        }

        //for xsd
        else {
            list = doc.getElementsByTagName("xs:import");
            for (int i = 0; i < list.getLength(); i++) {

                Element el=  (Element) list.item(i);

                String s = el.getAttribute("schemaLocation");
                if(s!=null){
                    this.getUrlContent(s);
                }
            }

        }
        log.debug("no XSDs were found");
    }


    //-----------------------------------------------------------------------------------------------------------------------------
    @Override
    public LdpResponse createServiceRegexes(String url, int serviceId) {
        log.debug("Starting to build Regex from wsdl");
        LdpResponse ldpResponse = new LdpResponse();
        ldpResponse.setResponseCode(HttpStatus.OK);
        ldpResponse.setResponseMessage("Success");
        String error = "";
        log.debug("Removing all ServiceRegex for service");
        serviceRegexRepo.findAll().forEach(serviceRegex -> {
            if (serviceRegex.getServiceId() == serviceId){
                serviceRegexRepo.delete(serviceRegex);
            }

        });
        //build a wsdlProject from the com.smartbear.soapui dependency that relies on the smartbear repository.
        try {
            WsdlProject project  = new WsdlProject();
            WsdlInterface[] wsdls = WsdlImporter.importWsdl(project, url);
            WsdlInterface wsdl = wsdls[0];
            for (Operation operation : wsdl.getOperationList()) {
                WsdlOperation wsdlOperation = (WsdlOperation) operation;

                //build a request and a response based on the wsdl
                String request = wsdlOperation.createRequest(true);
                String response = (wsdlOperation.createResponse(true));

                log.debug("Operation name: "+wsdlOperation.getName());
                log.debug("Request:");
                log.debug(request);
                log.debug("Response:");
                log.debug(response);

                //Creat and save the serviceRegexes
                boolean req = buildServiceRegex(request, serviceId, "Request");
                boolean res = buildServiceRegex(response, serviceId, "Response");

                if(!req || !res){
                    error = "Could not build Regex from wsdl.";
                    log.error(error);
                    ldpResponse.setResponseCode(HttpStatus.CONFLICT);
                    ldpResponse.setResponseMessage(error);
                }

            }
        } catch (Exception e) {
            error = "Could not generate request or response for url [" +url+"]: " + e;
            log.error(error + e);
            ldpResponse.setResponseCode(HttpStatus.CONFLICT);
            ldpResponse.setResponseMessage(error);
        }



        return ldpResponse;
    }
    //-----------------------------------------------------------------------------------------------------------------------------
    private boolean buildServiceRegex(String xml, int serviceId, String type) throws Exception{
        boolean added = true;
        log.debug("Creating ServiceRegex for [" +type+"]");
        int counter = 0;

        try {
            //make a list of all the elements already exists for this service
            List<String> elementList = new ArrayList<String>();
            List<ServiceRegularExpressions> serviceRegexList =   serviceRegexRepo.findByServiceId(serviceId);
            if (serviceRegexList.size() != 0 && serviceRegexList!= null){
                for (ServiceRegularExpressions serviceRegularExpressions : serviceRegexList) {
                    elementList.add(serviceRegularExpressions.getElement());
                }
            }
            //make Xpath for all the nodes in the request and put them into a list
            XPath xPath = XPathFactory.newInstance().newXPath();
            String expression = "//*[not(*)]";
            Document doc = Utils.buildXML(xml);
            List<String> xPathList = new ArrayList<String>();
            NodeList nodeList = (NodeList) xPath.compile(expression).evaluate(doc, XPathConstants.NODESET);

            for (int i = 0; i < nodeList.getLength(); i++) {
			System.out.println(getXPath(nodeList.item(i)));
                xPathList.add(getXPath(nodeList.item(i)));
            }

            //Take from the list only the required Xpath.
            // only Strings that do not already exists in the db will be saved.


            for (String current : xPathList) {
                //for Request
                if(type.equals("Request")){
                    if(current.contains("RequestChannel.Channel")){
                        String newString = current.substring(current.lastIndexOf("RequestChannel.Channel") );
                        if(!elementList.contains(newString)){
                            log.debug("Saving new element to serviceRegex: ["+newString+"]");
                            ServiceRegularExpressions serviceRegex = new ServiceRegularExpressions();
                            serviceRegex.setElement(newString);
                            serviceRegex.setServiceId(serviceId);
                            serviceRegex.setMessageType("Request");
                            serviceRegexRepo.save(serviceRegex);
                            counter++;

//			System.out.println(newString);

                        } else {
                            log.debug("elemnt [ " + newString+ " ] already exists in db");
                        }
                    }
                } else if (type.equals("Response")){
                    if(current.contains("ResponseChannel.Channel")){
                        String newString = current.substring(current.lastIndexOf("ResponseChannel.Channel") );
                        if(!elementList.contains(newString)){

                            ServiceRegularExpressions serviceRegex = new ServiceRegularExpressions();
                            serviceRegex.setElement(newString);
                            serviceRegex.setServiceId(serviceId);
                            serviceRegex.setMessageType("Response");
                            serviceRegexRepo.save(serviceRegex);
                            counter++;
                            // System.out.println(newString);
                        } else {
                            log.debug("elemnt [ " +newString+ " ] already exists in db");
                        }
                    }
                }
            }
            log.debug("succssefully created [" + counter	+ "] ServiceRegex, for [" + type+ "] message ");
            return added;
        } catch (Exception e){
            log.debug("Could not create serviceRegexes" + e);
            return !added;
        }
    }

    //-----------------------------------------------------------------------------------------------------------------------------
    private String getXPath(Node node){
        Node parent = node.getParentNode();
        if(parent ==null){
            return node.getNodeName();
        }
        return getXPath(parent) + "." +node.getNodeName() ;
    }

    //-----------------------------------------------------------------------------------------------------------------------------
    @Override
    public LdpResponse buildRegexFromJson(JsonRequestAndResponse requestAndResponse) {

        LdpResponse ldpResponse = new LdpResponse();
        ldpResponse.setResponseCode(HttpStatus.OK);
        if(StringUtils.isEmpty(requestAndResponse.getServiceId()) || requestAndResponse.getServiceId() == 0 ){
            String error = "Could not find ServiceId in message., or ServiceId is 0";
            ldpResponse.setResponseCode(HttpStatus.CONFLICT);
            ldpResponse.setResponseMessage(error);
            return ldpResponse;
        }

        int serviceId = requestAndResponse.getServiceId();
        try {
            List<String> requestRegexFields = getFields(requestAndResponse.getRequest(), MessageTypes.REQUEST);
            List<String> responseRegexFields = getFields(requestAndResponse.getResponse(), MessageTypes.RESPONSE);

            log.debug("Removing all ServiceRegex for service [" +serviceId+"]");
            serviceRegexRepo.findAll().forEach(serviceRegex -> {
                if (serviceRegex.getServiceId() == serviceId) {
                    serviceRegexRepo.delete(serviceRegex);
                }
            });
            int requestCounter  = saveRegexes(requestRegexFields,  MessageTypes.REQUEST, serviceId);
            int responsecounter = saveRegexes(responseRegexFields,  MessageTypes.RESPONSE, serviceId);
            String sum = "Successfully added [" +requestCounter+"] Request Regex, and [" +responsecounter+"] Response Regex";
            log.debug(sum);
            ldpResponse.setResponseMessage(sum);

        } catch (Exception e){
            String error = "Could not build Regex fields " + e;
            log.error(error);
            ldpResponse.setResponseCode(HttpStatus.CONFLICT);
            ldpResponse.setResponseMessage(error + e);
            return ldpResponse;
        }
        return ldpResponse;
    }
    //-----------------------------------------------------------------------------------------------------------------------------

    private int saveRegexes(List<String> requestRegexFields, MessageTypes request, int serviceId) throws Exception {
        int counter = 0;
        log.debug("About to save into ServiceRegex for message Type: [" +request.toString()+"]");
        for (String element : requestRegexFields) {

            ServiceRegularExpressions serviceRegex = new ServiceRegularExpressions();
            serviceRegex.setElement(element);
            serviceRegex.setServiceId(serviceId);
            serviceRegex.setMessageType(request.synonym);
            serviceRegexRepo.save(serviceRegex);
            counter++;
        }
        log.debug("Successfully saved [" +counter+ "] Regexes of type ["+request.synonym+"]");
        return counter;

    }

    //-----------------------------------------------------------------------------------------------------------------------------

    private List<String> getFields(Object messageObject, MessageTypes messageType) throws Exception {
        log.debug("Building elements for message Type [" +messageType.toString()+ "]");
        List<String> regexFieldList = new ArrayList<>();
        Gson gson = new Gson();
        if (messageObject.toString().length() <= 2){
            log.debug("Message Type [" +messageType.toString()+"] is empty or null.");
            return regexFieldList;
        }


        String jsonObject = gson.toJson(messageObject);
        JSONObject o = new JSONObject(jsonObject);
        String xmlString = XML.toString(o);
        xmlString = Utils.addTagsToContent(xmlString, MOCK_ROOT_ELEMENT);

        XPath xPath = XPathFactory.newInstance().newXPath();
        String expression = "//*[not(*)]";
        Document doc = Utils.buildXML(xmlString);
        List<String> xPathList = new ArrayList<String>();
        NodeList nodeList = (NodeList) xPath.compile(expression).evaluate(doc, XPathConstants.NODESET);

        for (int i = 0; i < nodeList.getLength(); i++) {
//			System.out.println(getXPath(nodeList.item(i)));
            xPathList.add(getXPath(nodeList.item(i)));
        }

        //Take from the list only the required Xpath.

        log.debug("Building elements without mock root element: ");
        for (String current : xPathList) {
            String newString = current.substring((current.indexOf(MOCK_ROOT_ELEMENT + ".") +MOCK_ROOT_ELEMENT.length()+1 ));
            if (!regexFieldList.contains(newString)){
                regexFieldList.add(newString);
                log.debug(newString);
            } else {
                log.debug("Duplicated element [" +newString+"]. not saving");
            }
        }
        return regexFieldList;
    }
}

