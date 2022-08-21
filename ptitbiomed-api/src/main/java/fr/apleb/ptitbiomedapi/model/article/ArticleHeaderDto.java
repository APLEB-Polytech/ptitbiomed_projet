package fr.apleb.ptitbiomedapi.model.article;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

public record ArticleHeaderDto(UUID uuid,
                               LocalDateTime creationTime,
                               LocalDateTime updateTime,
                               String author,
                               String title) implements Serializable {

	public ArticleHeaderDto(Article article) {
		this(article.getUuid(), article.getCreationTime(), article.getUpdateTime(), article.getAuthor(), article.getTitle());
	}

}
