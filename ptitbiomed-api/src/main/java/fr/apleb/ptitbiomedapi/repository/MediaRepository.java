package fr.apleb.ptitbiomedapi.repository;

import fr.apleb.ptitbiomedapi.model.Media;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaRepository extends JpaRepository<Media, String> {
}