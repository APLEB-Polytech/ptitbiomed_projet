package fr.apleb.ptitbiomedapi.repository;

import java.util.List;
import java.util.UUID;

import fr.apleb.ptitbiomedapi.model.article.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, UUID> {
	List<Article> findAllByOrderByCreationTimeDesc();
}
