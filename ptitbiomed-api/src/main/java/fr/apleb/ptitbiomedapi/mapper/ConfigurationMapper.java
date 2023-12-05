package fr.apleb.ptitbiomedapi.mapper;

import fr.apleb.ptitbiomedapi.dto.ConfigurationDto;
import fr.apleb.ptitbiomedapi.model.Configuration;
import org.mapstruct.*;

import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;

@Mapper(componentModel = "spring")
public interface ConfigurationMapper {

    ConfigurationDto map(Configuration entity);

    @InheritInverseConfiguration
    @BeanMapping(nullValuePropertyMappingStrategy = IGNORE)
    @Mapping(target = "id", ignore = true)
    Configuration patch(@MappingTarget Configuration entity, ConfigurationDto patch);

}
