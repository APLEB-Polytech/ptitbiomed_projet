package fr.apleb.ptitbiomedapi.dto;

import lombok.Builder;

@Builder
public record ConfigurationDto(
    String logoUrl,
    String footer,
    String faviconUrl
) {}
