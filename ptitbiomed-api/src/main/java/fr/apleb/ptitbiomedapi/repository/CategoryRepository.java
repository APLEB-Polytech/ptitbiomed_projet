package fr.apleb.ptitbiomedapi.repository;

import fr.apleb.ptitbiomedapi.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
}
