package fr.apleb.ptitbiomedapi.model.menu;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "submenua")
public class Submenua {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

	@Column(name = "label", nullable = false)
	private String label;

	@Column(name = "id_parent", nullable = false)
	private Integer idParent;

	@Column(name = "link")
	private String link;

	@Column
	private String idArticle;

	@OneToMany(orphanRemoval = true)
	private List<Submenub> submenubs = new ArrayList<>();

	public List<Submenub> getSubmenubs() {
		return submenubs;
	}

	public void setSubmenubs(List<Submenub> submenubs) {
		this.submenubs = submenubs;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Integer getIdParent() {
        return idParent;
    }

    public void setIdParent(Integer idParent) {
        this.idParent = idParent;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

	@Override
	public String toString() {
		return "Submenua{" +
				"id=" + id +
				", label='" + label + '\'' +
				", idParent=" + idParent +
				", link='" + link + '\'' +
				", submenubs=" + submenubs +
				'}';
	}

	public String getIdArticle() {
		return idArticle;
	}

	public void setIdArticle(String idArticle) {
		this.idArticle = idArticle;
	}
}