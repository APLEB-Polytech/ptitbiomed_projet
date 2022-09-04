package fr.apleb.ptitbiomedapi.model.menu;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class MenuDto implements Serializable {
	private final Long id;
	private final String label;
	private final String link;
	private final String idArticle;

	private final int rank;
	private List<Submenua> submenuas;

	public MenuDto(Long id, String label, String link, String idArticle, int rank) {
		this.id = id;
		this.label = label;
		this.link = link;
		this.idArticle = idArticle;
		this.submenuas = new ArrayList<>();
		this.rank = rank;
	}

    public Long getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }

    public String getLink() {
        return link;
    }

	public List<Submenua> getSubmenuas() {
		return submenuas;
	}

	public void setSubmenuas(List<Submenua> list) {
		this.submenuas = list;
	}

	public int getRank() {
		return rank;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof MenuDto)) return false;
		MenuDto menuDto = (MenuDto) o;
		return Objects.equals(id, menuDto.id) && Objects.equals(label, menuDto.label) && Objects.equals(link, menuDto.link) && Objects.equals(submenuas, menuDto.submenuas);
	}

	@Override
    public int hashCode() {
        return Objects.hash(id, label, link, submenuas);
    }

	@Override
	public String toString() {
		return "MenuDto{" +
				"id=" + id +
				", label='" + label + '\'' +
				", link='" + link + '\'' +
				", submenuas=" + submenuas +
				'}';
	}

	public String getIdArticle() {
		return idArticle;
	}
}
