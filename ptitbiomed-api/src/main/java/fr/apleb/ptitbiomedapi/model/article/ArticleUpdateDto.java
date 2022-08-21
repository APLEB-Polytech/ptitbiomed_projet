package fr.apleb.ptitbiomedapi.model.article;

import java.io.Serializable;
import java.util.UUID;

public record ArticleUpdateDto(String author,
                               String title,
                               String html,
                               UUID uuid) implements Serializable {
}
