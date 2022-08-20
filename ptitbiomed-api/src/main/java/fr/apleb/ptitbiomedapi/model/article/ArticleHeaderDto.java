package fr.apleb.ptitbiomedapi.model.article;

import java.time.Instant;
import java.util.UUID;

public record ArticleHeaderDto(UUID uuid,
                               Instant creationTime,
                               Instant updateTime,
                               String author,
                               String title) {

	public ArticleHeaderDto(Article article) {
		this(article.getUuid(), article.getCreationTime(), article.getUpdateTime(), article.getAuthor(), article.getTitle());
	}

}
