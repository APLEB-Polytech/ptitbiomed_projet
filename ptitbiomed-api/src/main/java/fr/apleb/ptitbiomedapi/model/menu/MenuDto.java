package fr.apleb.ptitbiomedapi.model.menu;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

public record MenuDto(Integer id, String label, String link,
                      UUID idArticle, UUID idCategory, int rank,
                      Integer idParent, boolean hidden) implements Serializable {

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof MenuDto that)) return false;
		return Objects.equals(this.id, that.id)
				&& Objects.equals(this.label, that.label);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, label);
	}

	@Override
	public String toString() {
		return "MenuDto{" +
				"id=" + id +
				", label='" + label + '\'' +
				'}';
	}
}
