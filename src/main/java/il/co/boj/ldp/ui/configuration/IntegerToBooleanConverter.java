package il.co.boj.ldp.ui.configuration;


import org.springframework.core.convert.converter.Converter;

public class IntegerToBooleanConverter implements Converter<Integer, Boolean> {
    final Integer one = 1;
    @Override
    public Boolean convert(Integer integer) {
        if(one.equals(integer)){
            return true;
        }
        return false;
    }
}
