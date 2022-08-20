package fr.apleb.ptitbiomedapi.service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import fr.apleb.ptitbiomedapi.model.article.Article;
import fr.apleb.ptitbiomedapi.model.article.ArticleCreationDto;
import fr.apleb.ptitbiomedapi.model.article.ArticleHeaderDto;
import fr.apleb.ptitbiomedapi.model.article.ArticleReadDto;
import fr.apleb.ptitbiomedapi.repository.ArticleRepository;
import org.springframework.stereotype.Service;

@Service
public class ArticleService {
	private final ArticleRepository articleRepository;

	private ArticleService(ArticleRepository articleRepository) {
		this.articleRepository = articleRepository;
	}

	public List<ArticleHeaderDto> getArticleHeaders() {
		return articleRepository.findAllByOrderByCreationTimeDesc().stream()
				.map(ArticleHeaderDto::new)
				.collect(Collectors.toList());
	}

	public Optional<ArticleReadDto> getArticle(UUID uuid) {
		return articleRepository.findById(uuid).map(ArticleReadDto::new);
	}

	public void createNew(ArticleCreationDto articleCreation) {
		final Instant now = Instant.now();

		final Article article = new Article();
		article.setCreationTime(now);
		article.setUpdateTime(now);
		article.setAuthor(articleCreation.author());
		article.setTitle(articleCreation.title());
		article.setHtml(articleCreation.html());

		articleRepository.save(article);
	}

}
