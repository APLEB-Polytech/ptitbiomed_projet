package fr.apleb.ptitbiomedapi.controller;

import fr.apleb.ptitbiomedapi.service.ConfigurationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

import static lombok.AccessLevel.PROTECTED;
import static org.springframework.http.HttpStatus.PERMANENT_REDIRECT;
import static org.springframework.http.MediaType.TEXT_PLAIN_VALUE;

@RestController
@RequestMapping("/api/asset")
@RequiredArgsConstructor(access = PROTECTED)
public class AssetController {

    private final ConfigurationService configurationService;

    @GetMapping("/favicon.ico")
    public ResponseEntity<Void> getFavicon() {
        return ResponseEntity.status(PERMANENT_REDIRECT)
            .location(URI.create(configurationService.getConfigurationEntity().getFaviconUrl()))
            .build();
    }

    @GetMapping(value = "/footer", produces = TEXT_PLAIN_VALUE)
    public ResponseEntity<String> getFooter() {
        return ResponseEntity.ok(configurationService.getConfigurationEntity().getFooter());
    }

    @GetMapping("/logo.png")
    public ResponseEntity<Void> getLogoUrl() {
        return ResponseEntity.status(PERMANENT_REDIRECT)
            .location(URI.create(configurationService.getConfigurationEntity().getLogoUrl()))
            .build();
    }

}
