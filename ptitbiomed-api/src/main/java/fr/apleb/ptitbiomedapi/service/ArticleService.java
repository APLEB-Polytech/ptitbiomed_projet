package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.exception.NotFoundException;
import fr.apleb.ptitbiomedapi.model.article.*;
import fr.apleb.ptitbiomedapi.repository.ArticleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ArticleService {
	private final ArticleRepository articleRepository;

	private ArticleService(ArticleRepository articleRepository) {
		this.articleRepository = articleRepository;
	}

	public List<ArticleHeaderDto> getArticleHeaders() {
		return articleRepository.findAllByOrderByCreationTimeDesc().stream()
				.map(ArticleHeaderDto::new)
				.toList();
	}

	public Optional<ArticleReadDto> getArticle(UUID uuid) {
		return articleRepository.findById(uuid).map(ArticleReadDto::new);
	}

	public void createNew(ArticleCreationDto articleCreation) {
		final LocalDateTime now = LocalDateTime.now();

		final Article article = new Article();
		article.setCreationTime(now);
		article.setUpdateTime(now);
		article.setAuthor(articleCreation.author());
		article.setTitle(articleCreation.title());
		article.setHtml(articleCreation.html());

		articleRepository.save(article);
	}

	public void updateArticle(ArticleUpdateDto articleReadDto) {
		Article article = this.articleRepository.findById(articleReadDto.uuid()).orElseThrow(NotFoundException::new);
		article.setTitle(articleReadDto.title());
		article.setAuthor(articleReadDto.author());
		article.setHtml(articleReadDto.html());
		article.setUpdateTime(LocalDateTime.now());
		this.articleRepository.save(article);
	}
	
	public void deleteArticle(UUID uuid) {
		if (!this.articleRepository.existsById(uuid)) throw new NotFoundException();
		this.articleRepository.deleteById(uuid);
	}
}
