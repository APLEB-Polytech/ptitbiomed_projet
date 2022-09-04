package fr.apleb.ptitbiomedapi.model.article;

import java.util.UUID;

public record ArticleCreationDto(String author,
                                 String title,
                                 String html,
                                 MenuArticleDto menuArticle) implements EditArticleDTO {
	@Override
	public UUID uuid() {
		return null;
	}
}
