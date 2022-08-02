package fr.apleb.ptitbiomedapi.repository;

import fr.apleb.ptitbiomedapi.model.Media;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MediaRepository extends JpaRepository<Media, Integer> {
	List<Media> findByTypeStartsWithIgnoreCase(String type);

}