package il.co.boj.ldp.ui.service;

/**
 * Created by ofer on 12/03/18.
 */
import il.co.boj.ldp.ui.model.JsonRequestAndResponse;
import il.co.boj.ldp.ui.model.LdpResponse;
import il.co.boj.ldp.ui.model.MultiServiceDetailsResponse;

public interface GetSchemasFromWSDL {



    public LdpResponse getSchemasFromWSDL(String url, int serviceId);
    public LdpResponse createServiceRegexes(String url, int serviceId);
    public LdpResponse buildRegexFromJson(JsonRequestAndResponse requestAndResponse);
    public MultiServiceDetailsResponse getMultiServicesFromWsdl(String url);



}