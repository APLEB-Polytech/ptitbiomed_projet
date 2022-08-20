package fr.apleb.ptitbiomedapi.model.article;

import java.time.Instant;

public record ArticleReadDto(Instant creationTime,
                             Instant updateTime,
                             String author,
                             String title,
                             String html) {

	public ArticleReadDto(Article article) {
		this(article.getCreationTime(), article.getUpdateTime(), article.getAuthor(), article.getTitle(), article.getHtml());
	}

}
