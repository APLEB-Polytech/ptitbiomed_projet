package fr.apleb.ptitbiomedapi.model.article;

import java.io.Serializable;

public record MenuArticleDto(Integer idMenu, Integer idSousMenu) implements Serializable {
}
