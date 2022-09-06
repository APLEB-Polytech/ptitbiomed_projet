package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.exception.NotFoundException;
import fr.apleb.ptitbiomedapi.model.article.*;
import fr.apleb.ptitbiomedapi.model.menu.Menu;
import fr.apleb.ptitbiomedapi.model.menu.Submenua;
import fr.apleb.ptitbiomedapi.model.menu.Submenub;
import fr.apleb.ptitbiomedapi.repository.ArticleRepository;
import fr.apleb.ptitbiomedapi.repository.menu.MenuRepository;
import fr.apleb.ptitbiomedapi.repository.menu.SubmenuaRepository;
import fr.apleb.ptitbiomedapi.repository.menu.SubmenubRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ArticleService {
	private final ArticleRepository articleRepository;
	private final SubmenuaRepository submenuaRepository;
	private final SubmenubRepository submenubRepository;
	private final MenuRepository menuRepository;

	public ArticleService(ArticleRepository articleRepository, SubmenuaRepository submenuaRepository, SubmenubRepository submenubRepository, MenuRepository menuRepository) {
		this.articleRepository = articleRepository;
		this.submenuaRepository = submenuaRepository;
		this.submenubRepository = submenubRepository;
		this.menuRepository = menuRepository;
	}

	public List<ArticleHeaderDto> getArticleHeaders() {
		return articleRepository.findAllByOrderByCreationTimeDesc().stream()
				.map(ArticleHeaderDto::new)
				.toList();
	}

	public Optional<ArticleReadDto> getArticle(UUID uuid) {
		return articleRepository.findById(uuid).map(ArticleReadDto::new);
	}

	public Optional<ArticleReadDto> getAccueil() {
		return articleRepository.findByTitle("accueil").map(ArticleReadDto::new);
	}

	@Transactional(isolation = Isolation.READ_UNCOMMITTED)
	public void createNew(ArticleCreationDto articleCreation) {
		final LocalDateTime now = LocalDateTime.now();

		final Article article = new Article();
		article.setCreationTime(now);
		article.setUpdateTime(now);
		article.setAuthor(articleCreation.author());
		article.setTitle(articleCreation.title());
		article.setHtml(articleCreation.html());
		final Article article1 = articleRepository.save(article);
		this.processMenuArticle(new ArticleUpdateDto(null, articleCreation.title(), null, article1.getUuid(), articleCreation.menuArticle()));
	}

	@Transactional(isolation = Isolation.READ_UNCOMMITTED)
	public void updateArticle(ArticleUpdateDto articleReadDto) {
		Article article = this.articleRepository.findById(articleReadDto.uuid()).orElseThrow(NotFoundException::new);
		article.setTitle(articleReadDto.title());
		article.setAuthor(articleReadDto.author());
		article.setHtml(articleReadDto.html());
		article.setUpdateTime(LocalDateTime.now());
		this.processMenuArticle(articleReadDto);
		this.articleRepository.save(article);
	}

	public void deleteArticle(UUID uuid) {
		if (!this.articleRepository.existsById(uuid)) throw new NotFoundException();
		this.articleRepository.deleteById(uuid);
	}

	/**
	 * Ajoute un article au menu si son objet menuArticleDto n'est pas null
	 */
	private void processMenuArticle(EditArticleDTO editArticleDTO) {
		if (editArticleDTO.menuArticle() == null) {
			return;
		}
		final MenuArticleDto menuArticleDto = editArticleDTO.menuArticle();
		if (menuArticleDto.idSousMenu() != null) {
			Submenua parentA = this.submenuaRepository.findByIdAndIdParent(menuArticleDto.idSousMenu(), menuArticleDto.idMenu());
			Submenub submenub = new Submenub();
			submenub.setIdParent(parentA.getId());
			submenub.setLabel(editArticleDTO.title());
			submenub.setIdArticle(editArticleDTO.uuid().toString());
			this.submenubRepository.save(submenub);
			return;
		}
		if (menuArticleDto.idMenu() != null) {
			Submenua submenua = new Submenua();
			submenua.setIdParent(menuArticleDto.idMenu());
			submenua.setLabel(editArticleDTO.title());
			submenua.setIdArticle(editArticleDTO.uuid().toString());
			this.submenuaRepository.save(submenua);
			return;
		}
		Menu menu = new Menu();
		menu.setLabel(editArticleDTO.title());
		menu.setIdArticle(editArticleDTO.uuid().toString());
		this.menuRepository.save(menu);

	}


}
