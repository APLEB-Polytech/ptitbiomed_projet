package fr.apleb.ptitbiomedapi.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import static lombok.AccessLevel.PACKAGE;

@Component
@Getter
@RequiredArgsConstructor(access = PACKAGE)
public class ApplicationProperties {

	@Value("${apleb.jwtSecret}")
	private final String jwtSecret;

	@Value("${apleb.jwtExpiration}")
	private final int jwtExpiration;

	@Value("${apleb.uploadDirectory}")
	private final String uploadDirectory;

}
