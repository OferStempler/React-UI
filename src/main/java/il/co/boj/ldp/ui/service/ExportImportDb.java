package il.co.boj.ldp.ui.service;

/**
 * Created by ofer on 24/01/18.
 */
import il.co.boj.ldp.ui.model.ImportExportResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;



public interface ExportImportDb {

    String exportEntireDb();
    ImportExportResponse importDb(String data);
    String exportByServiceId(List<Integer> serviceIds);
    ImportExportResponse reloadFromLdp();
    ImportExportResponse buildContentFromFile(MultipartFile attachmentFile); //for local testing
}
