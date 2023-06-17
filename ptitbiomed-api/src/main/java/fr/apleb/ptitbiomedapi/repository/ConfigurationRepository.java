package fr.apleb.ptitbiomedapi.repository;

import fr.apleb.ptitbiomedapi.model.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfigurationRepository extends JpaRepository<Configuration, Integer> {
}
