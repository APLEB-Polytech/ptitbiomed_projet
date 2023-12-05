package fr.apleb.ptitbiomedapi.config.security;

import fr.apleb.ptitbiomedapi.config.ApplicationProperties;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.util.Date;

import static java.time.temporal.ChronoUnit.MILLIS;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtUtils {

    private final Key jwtSignKey;
    private final JwtParser jwtParser;
    private final ApplicationProperties applicationProperties;

    public String generateJwtToken(Authentication authentication) {
        final UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
        final Instant issuanceInstant = Instant.now();

        return Jwts.builder()
            .setSubject((userPrincipal.getUsername()))
            .setIssuedAt(Date.from(issuanceInstant))
            .setExpiration(Date.from(issuanceInstant.plus(applicationProperties.getJwtExpiration(), MILLIS)))
            .signWith(jwtSignKey)
            .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return jwtParser.parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            jwtParser.parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            log.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}
