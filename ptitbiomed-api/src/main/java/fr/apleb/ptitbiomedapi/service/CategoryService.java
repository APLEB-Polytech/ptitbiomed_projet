package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.dto.CategoryDto;
import fr.apleb.ptitbiomedapi.exception.NotFoundException;
import fr.apleb.ptitbiomedapi.model.Category;
import fr.apleb.ptitbiomedapi.model.CategoryArticle;
import fr.apleb.ptitbiomedapi.repository.ArticleRepository;
import fr.apleb.ptitbiomedapi.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CategoryService {

	private final CategoryRepository categoryRepository;
	private final ArticleRepository articleRepository;

	public CategoryService(CategoryRepository categoryRepository, ArticleRepository articleRepository) {
		this.categoryRepository = categoryRepository;
		this.articleRepository = articleRepository;
	}

	public List<CategoryDto> getAllCategories() {
		return this.categoryRepository.findAll().stream()
				.map(CategoryDto::fromCategory)
				.toList();
	}

	public CategoryDto getCategoryByUUID(UUID uuid) {
		return CategoryDto.fromCategory(
				this.categoryRepository.findById(uuid)
						.orElseThrow(NotFoundException::new)
		);
	}

	public void createCategory(String name) {
		this.categoryRepository.save(new Category(name));
	}

	public void updateCategory(CategoryDto update) {
		final Category category = this.categoryRepository.findById(update.uuid())
				.orElseThrow(NotFoundException::new);

		final LinkedList<CategoryArticle> articles = new LinkedList<>();
		for (UUID articleUuid : update.articles()) {
			articles.addLast(new CategoryArticle(
					category,
					this.articleRepository.findById(articleUuid)
							.orElseThrow(NotFoundException::new),
					articles.size()
			));
		}

		category.setName(update.name());
		category.setArticles(articles);
		
		this.categoryRepository.save(category);
	}

	public void deleteCategory(UUID uuid) {
		if (!this.categoryRepository.existsById(uuid)) throw new NotFoundException();
		this.categoryRepository.deleteById(uuid);
	}

}
