package il.co.boj.ldp.ui.utils;

/**
 * Created by ofer on 15/03/18.
 */
import lombok.extern.log4j.Log4j;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.StringReader;
@Log4j
public class Utils {
    //--------------------------------------------------------------------------------------------------------------------------------------

    public static  Document buildXML(String xmlString) throws Exception {

        Document doc = null;
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setNamespaceAware(false);
        factory.setValidating(false);
        DocumentBuilder builder = factory.newDocumentBuilder();
        doc =  builder.parse(new InputSource(new StringReader(xmlString)));
        return doc;
    }
    //--------------------------------------------------------------------------------------------------------------------------------------

    public static String addTagsToContent(String requestContent, String messageType) {

        String tagStart = "<"  + messageType + ">";
        String tagEnd   = "</" + messageType + ">";

        if ( !requestContent.startsWith( tagStart )){
            requestContent = tagStart + requestContent + tagEnd;
            log.debug("Successfully added root element [<"+messageType+">]");
        } else {
            log.debug("MessageContent already have root element, doing nothing");

        }
        return requestContent;
    }
}
