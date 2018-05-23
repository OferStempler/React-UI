package il.co.boj.ldp.ui.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by ofer on 24/01/18.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImportExportResponse {

    private boolean success;
    private String responseMessage;
}
