package fr.apleb.ptitbiomedapi.controller;

import java.util.List;
import java.util.UUID;

import fr.apleb.ptitbiomedapi.config.security.payload.MessageResponse;
import fr.apleb.ptitbiomedapi.exception.NotFoundException;
import fr.apleb.ptitbiomedapi.model.article.ArticleCreationDto;
import fr.apleb.ptitbiomedapi.model.article.ArticleHeaderDto;
import fr.apleb.ptitbiomedapi.model.article.ArticleReadDto;
import fr.apleb.ptitbiomedapi.service.ArticleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/article")
public class ArticleController {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	private final ArticleService articleService;

	private ArticleController(ArticleService articleService) {
		this.articleService = articleService;
	}

	@GetMapping("")
	private ResponseEntity<List<ArticleHeaderDto>> getAllArticleHeaders() {
		logger.debug("REST GET articleHeaders");
		return ResponseEntity.ok(articleService.getArticleHeaders());
	}

	@GetMapping("/read/{uuid}")
	private ResponseEntity<ArticleReadDto> read_by_uuid(@PathVariable UUID uuid) {
		return ResponseEntity.ok(articleService.getArticle(uuid).orElseThrow(NotFoundException::new));
	}

	@PostMapping("/save-new")
	public ResponseEntity<MessageResponse> save_new(@RequestBody ArticleCreationDto article) {
		logger.debug("REST POST saveNewArticle: " + article.toString());
		articleService.createNew(article);
		return ResponseEntity.ok(new MessageResponse("Article created"));
	}

}
