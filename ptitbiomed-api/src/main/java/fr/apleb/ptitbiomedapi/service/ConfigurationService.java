package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.dto.ConfigurationDto;
import fr.apleb.ptitbiomedapi.exception.NotFoundException;
import fr.apleb.ptitbiomedapi.model.Configuration;
import fr.apleb.ptitbiomedapi.repository.ConfigurationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static fr.apleb.ptitbiomedapi.dto.ConfigurationDto.fromModel;
import static fr.apleb.ptitbiomedapi.dto.ConfigurationDto.patchModel;

@Service
@RequiredArgsConstructor
public final class ConfigurationService {

    private final ConfigurationRepository configurationRepository;

    public ConfigurationDto getConfiguration() {
        return fromModel(retrieveConfiguration());
    }

    public void patchConfiguration(ConfigurationDto patch) {
        configurationRepository.save(patchModel(
            retrieveConfiguration(), patch
        ));
    }

    private Configuration retrieveConfiguration() {
        return configurationRepository.findById(1).orElseThrow(NotFoundException::new);
    }

}
