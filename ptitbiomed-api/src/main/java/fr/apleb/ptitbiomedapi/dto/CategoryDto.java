package fr.apleb.ptitbiomedapi.dto;

import fr.apleb.ptitbiomedapi.model.Category;
import fr.apleb.ptitbiomedapi.model.CategoryArticle;

import java.util.List;
import java.util.UUID;

public record CategoryDto(
		UUID uuid,
		String name,
		String summaryHtml,
		List<UUID> articles
) {

	public static CategoryDto fromCategory(Category category) {
		return new CategoryDto(
				category.getUuid(),
				category.getName(),
				category.getSummaryHtml(),
				category.getArticles().stream()
						.map(CategoryArticle::getId)
						.map(CategoryArticle.ID::getArticleUuid)
						.toList()
		);
	}

}
