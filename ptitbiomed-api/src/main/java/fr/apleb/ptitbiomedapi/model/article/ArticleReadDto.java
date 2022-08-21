package fr.apleb.ptitbiomedapi.model.article;

import java.time.LocalDateTime;

public record ArticleReadDto(LocalDateTime creationTime,
                             LocalDateTime updateTime,
                             String author,
                             String title,
                             String html) {

	public ArticleReadDto(Article article) {
		this(article.getCreationTime(), article.getUpdateTime(), article.getAuthor(), article.getTitle(), article.getHtml());
	}

}
