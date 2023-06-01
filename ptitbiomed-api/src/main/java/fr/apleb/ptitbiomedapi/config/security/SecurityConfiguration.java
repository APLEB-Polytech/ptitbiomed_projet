package fr.apleb.ptitbiomedapi.config.security;

import fr.apleb.ptitbiomedapi.config.ApplicationProperties;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;

import static io.jsonwebtoken.SignatureAlgorithm.HS512;

@Configuration
public class SecurityConfiguration {

    @Bean
    Key jwtSignKey(ApplicationProperties applicationProperties) {
        return new SecretKeySpec(
            Base64.getDecoder().decode(applicationProperties.getJwtSecret()),
            HS512.getJcaName()
        );
    }

    @Bean
    JwtParser jwtParser(Key jwtSignKey) {
        return Jwts.parserBuilder().setSigningKey(jwtSignKey).build();
    }

}
