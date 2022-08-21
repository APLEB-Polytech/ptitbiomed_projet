package fr.apleb.ptitbiomedapi.config.security;

import fr.apleb.ptitbiomedapi.config.ApplicationProperties;
import fr.apleb.ptitbiomedapi.config.security.service.UserDetailsImpl;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {
	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

	private final ApplicationProperties applicationProperties;

	public JwtUtils(ApplicationProperties applicationProperties) {
		this.applicationProperties = applicationProperties;
	}

	public String generateJwtToken(Authentication authentication) {
		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
		return Jwts.builder()
				.setSubject((userPrincipal.getUsername()))
				.setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + this.applicationProperties.getJwtExpiration()))
				.signWith(SignatureAlgorithm.HS512, this.applicationProperties.getJwtSecret())
				.compact();
	}

    public String getUserNameFromJwtToken(String token) {
	    return Jwts.parser().setSigningKey(this.applicationProperties.getJwtSecret()).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
	        Jwts.parser().setSigningKey(this.applicationProperties.getJwtSecret()).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}
