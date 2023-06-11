package fr.apleb.ptitbiomedapi.mapper;

import fr.apleb.ptitbiomedapi.dto.ConfigurationDto;
import fr.apleb.ptitbiomedapi.model.Configuration;
import org.mapstruct.BeanMapping;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;

@Mapper(componentModel = "spring")
public interface ConfigurationMapper {

    ConfigurationDto map(Configuration entity);

    @InheritInverseConfiguration
    @BeanMapping(nullValuePropertyMappingStrategy = IGNORE)
    Configuration patch(@MappingTarget Configuration entity, ConfigurationDto patch);

}
