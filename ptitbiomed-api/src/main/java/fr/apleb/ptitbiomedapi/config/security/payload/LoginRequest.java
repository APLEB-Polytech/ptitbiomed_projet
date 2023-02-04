package fr.apleb.ptitbiomedapi.config.security.payload;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(@NotBlank String username, @NotBlank String password) {
}
