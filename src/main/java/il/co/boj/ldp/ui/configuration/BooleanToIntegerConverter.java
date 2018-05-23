package il.co.boj.ldp.ui.configuration;


import org.springframework.core.convert.converter.Converter;

public class BooleanToIntegerConverter implements Converter<Boolean, Integer> {
    final Boolean yes = true;
    @Override
    public Integer convert(Boolean bool) {
        if(yes.equals(bool)){
            return 1;
        }
        return 0;
    }
}
