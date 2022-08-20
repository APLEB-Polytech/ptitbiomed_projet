package fr.apleb.ptitbiomedapi.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.apleb.ptitbiomedapi.exception.FileStorageException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class ConfigurationApp {

	private final ApplicationProperties applicationProperties;

	public ConfigurationApp(ApplicationProperties applicationProperties) {
		this.applicationProperties = applicationProperties;
	}

	@Bean
	public Path fileStorageLocation() {
		Path fileStorageLocation = Paths.get(this.applicationProperties.getUploadDirectory())
				.toAbsolutePath().normalize();
		try {
			Files.createDirectories(fileStorageLocation);
		} catch (Exception ex) {
			throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
		}
		return fileStorageLocation;
	}

	@Bean
	public ObjectMapper objectMapper() {
		return new ObjectMapper().findAndRegisterModules();
	}
}
