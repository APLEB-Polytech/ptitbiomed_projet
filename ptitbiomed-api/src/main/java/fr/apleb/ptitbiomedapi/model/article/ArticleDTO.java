package fr.apleb.ptitbiomedapi.model.article;

import java.io.Serializable;
import java.util.UUID;

public record ArticleDTO(String author,
                         String title,
                         String html,
                         UUID uuid) implements Serializable {
}
