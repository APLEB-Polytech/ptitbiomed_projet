package fr.apleb.ptitbiomedapi.controller;

import fr.apleb.ptitbiomedapi.dto.ConfigurationDto;
import fr.apleb.ptitbiomedapi.service.ConfigurationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/config")
public class ConfigurationController {

    private final ConfigurationService configurationService;

    @GetMapping
    ConfigurationDto getConfig() {
        return configurationService.getConfiguration();
    }

    @PatchMapping
    void patchConfig(@RequestBody ConfigurationDto patch) {
        configurationService.patchConfiguration(patch);
    }

}
