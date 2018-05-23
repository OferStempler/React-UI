package il.co.boj.ldp.ui.model.enums;

import java.util.Arrays;
import java.util.function.Function;

/**
 * Created by ofer on 15/03/18.
 */

public enum MessageTypes{ // the content-type
    REQUEST                (0, "Request"),
    RESPONSE                (1, "Response"),;

    public Integer code;
    public String  synonym;

    private MessageTypes(Integer code, String synonym) {
        this.code    = code;
        this.synonym = synonym;
    }

    public static Function<Integer, MessageTypes> getEnumByCode    = (code)-> Arrays.stream( MessageTypes.values() ).filter(tp->tp.code == code ).findFirst().get();
    public static Function<String,  MessageTypes> getEnumBySynonym = (syn)->Arrays.stream( MessageTypes.values() ).filter( tp->tp.synonym.equals( syn ) ).findFirst().get();

}