package fr.apleb.ptitbiomedapi.config.security.payload;

public record JwtResponse(String accessToken, Long id, String username, String email) {
    private static final String type = "Bearer";
}
