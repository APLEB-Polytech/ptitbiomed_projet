package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.dto.ConfigurationDto;
import fr.apleb.ptitbiomedapi.exception.NotFoundException;
import fr.apleb.ptitbiomedapi.mapper.ConfigurationMapper;
import fr.apleb.ptitbiomedapi.model.Configuration;
import fr.apleb.ptitbiomedapi.repository.ConfigurationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public final class ConfigurationService {

    private final ConfigurationRepository configurationRepository;
    private final ConfigurationMapper mapper;

    public ConfigurationDto getConfiguration() {
        return mapper.map(retrieveConfiguration());
    }

    public void patchConfiguration(ConfigurationDto patch) {
        configurationRepository.save(mapper.patch(
            retrieveConfiguration(), patch
        ));
    }

    private Configuration retrieveConfiguration() {
        return configurationRepository.findById(1).orElseThrow(NotFoundException::new);
    }

}
