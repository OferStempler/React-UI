package il.co.boj.ldp.ui.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.convert.*;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class MongoConfig {

    @Autowired
    private MongoDbFactory mongoFactory;

    @Autowired
    private MongoMappingContext mongoMappingContext;

//    @Bean
//    public MappingMongoConverter mongoConverter() throws Exception {
//        DbRefResolver dbRefResolver = new DefaultDbRefResolver(mongoFactory);
//        MappingMongoConverter mongoConverter = new MappingMongoConverter(dbRefResolver, mongoMappingContext);
//      //  mongoConverter.setTypeMapper(new DefaultMongoTypeMapper(null));
//        List<Converter> converters = new ArrayList<>();
//        converters.add(new BooleanToIntegerConverter());
//        converters.add(new IntegerToBooleanConverter());
//        mongoConverter.setCustomConversions(new CustomConversions(converters));
//        mongoConverter.afterPropertiesSet();
//        return mongoConverter;
//    }
}