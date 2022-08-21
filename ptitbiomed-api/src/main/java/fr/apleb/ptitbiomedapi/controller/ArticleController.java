package fr.apleb.ptitbiomedapi.controller;

import fr.apleb.ptitbiomedapi.exception.NotFoundException;
import fr.apleb.ptitbiomedapi.model.article.ArticleCreationDto;
import fr.apleb.ptitbiomedapi.model.article.ArticleDTO;
import fr.apleb.ptitbiomedapi.model.article.ArticleHeaderDto;
import fr.apleb.ptitbiomedapi.model.article.ArticleReadDto;
import fr.apleb.ptitbiomedapi.service.ArticleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/article")
public class ArticleController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	private final ArticleService articleService;

	private ArticleController(ArticleService articleService) {
		this.articleService = articleService;
	}

	@GetMapping
	private ResponseEntity<List<ArticleHeaderDto>> getAllArticleHeaders() {
		logger.debug("REST GET articleHeaders");
		return ResponseEntity.ok(articleService.getArticleHeaders());
	}

	@GetMapping("/{uuid}")
	private ResponseEntity<ArticleReadDto> read_by_uuid(@PathVariable UUID uuid) {
		return ResponseEntity.ok(articleService.getArticle(uuid).orElseThrow(NotFoundException::new));
	}

	@PutMapping
	private ResponseEntity<Void> update(@RequestBody ArticleDTO articleDTO) {
		this.logger.info("REST PUT update : {}", articleDTO);
		this.articleService.updateArticle(articleDTO);
		return ResponseEntity.noContent().build();
	}

	@PostMapping
	public ResponseEntity<Void> save_new(@RequestBody ArticleCreationDto article) {
		logger.info("REST POST saveNewArticle: " + article.toString());
		articleService.createNew(article);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

}
