package fr.apleb.ptitbiomedapi.model.article;

import java.util.UUID;

public interface EditArticleDTO {
	String author();

	String title();

	String html();

	MenuArticleDto menuArticle();

	UUID uuid();
}
