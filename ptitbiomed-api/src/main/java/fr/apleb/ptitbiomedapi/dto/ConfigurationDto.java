package fr.apleb.ptitbiomedapi.dto;

import fr.apleb.ptitbiomedapi.model.Configuration;

public record ConfigurationDto(
    String logoUrl,
    String footer
) {

    public static ConfigurationDto fromModel(Configuration configuration) {
        return new ConfigurationDto(
            configuration.getLogoUrl(),
            configuration.getFooter()
        );
    }

    public static Configuration patchModel(Configuration model, ConfigurationDto patch) {
        if (patch.logoUrl() != null) model.setLogoUrl(patch.logoUrl());
        if (patch.footer() != null) model.setFooter(patch.footer());

        return model;
    }

}
