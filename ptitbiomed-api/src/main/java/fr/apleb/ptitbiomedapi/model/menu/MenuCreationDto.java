package fr.apleb.ptitbiomedapi.model.menu;

import java.util.UUID;

public record MenuCreationDto(
		String label,
		int rank,
		Integer idParent,
		String link,
		UUID idArticle,
		UUID idCategory,
		boolean hidden
) {}
