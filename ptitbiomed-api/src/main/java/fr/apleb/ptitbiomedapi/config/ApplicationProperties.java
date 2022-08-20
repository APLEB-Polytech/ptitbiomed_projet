package fr.apleb.ptitbiomedapi.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "apleb")
public class ApplicationProperties {
	private String jwtSecret;
	private int jwtExpiration;

	private String uploadDirectory;

	public String getJwtSecret() {
		return jwtSecret;
	}

	public void setJwtSecret(String jwtSecret) {
		this.jwtSecret = jwtSecret;
	}

	public int getJwtExpiration() {
		return jwtExpiration;
	}

	public void setJwtExpiration(int jwtExpiration) {
		this.jwtExpiration = jwtExpiration;
	}

	public String getUploadDirectory() {
		return uploadDirectory;
	}

	public void setUploadDirectory(String uploadDirectory) {
		this.uploadDirectory = uploadDirectory;
	}
}
