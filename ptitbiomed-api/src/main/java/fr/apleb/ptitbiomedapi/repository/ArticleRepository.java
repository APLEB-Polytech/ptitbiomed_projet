package fr.apleb.ptitbiomedapi.repository;

import fr.apleb.ptitbiomedapi.model.article.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ArticleRepository extends JpaRepository<Article, UUID> {
	Optional<Article> findByCreationTime(LocalDateTime creationTime);

	List<Article> findAllByOrderByCreationTimeDesc();
}
