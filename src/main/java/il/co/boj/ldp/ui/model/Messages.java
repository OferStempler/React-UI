package il.co.boj.ldp.ui.model;

import lombok.Data;

import java.util.List;

/**
 * Created by ofer on 21/03/18.
 */
@Data
public class Messages {

    String messageType;
    List<String> fields;

}
