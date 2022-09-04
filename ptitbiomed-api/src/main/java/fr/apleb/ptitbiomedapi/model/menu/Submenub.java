package fr.apleb.ptitbiomedapi.model.menu;

import javax.persistence.*;

@Entity
@Table(name = "submenub")
public class Submenub {
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

	public String getIdArticle() {
		return idArticle;
	}

	public void setIdArticle(String idArticle) {
		this.idArticle = idArticle;
	}
}