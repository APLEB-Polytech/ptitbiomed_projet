package fr.apleb.ptitbiomedapi.model.menu;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "menu")
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

	@Column(name = "label", nullable = false)
	private String label;

	@Column(name = "rank", nullable = false)
	private int rank;

	@Column(name = "link")
	private String link;

	@Column(columnDefinition = "char(36)")
	@Type(type = "uuid-char")
	private UUID idArticle;

	@Column(columnDefinition = "char(36)")
	@Type(type = "uuid-char")
	private UUID idCategory;

	@Column(name = "id_parent")
	private Integer idParent;

	@Column(name = "hidden")
	private boolean hidden;

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

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public UUID getIdArticle() {
		return idArticle;
	}

	public void setIdArticle(UUID idArticle) {
		this.idArticle = idArticle;
	}

	public UUID getIdCategory() {
		return idCategory;
	}

	public void setIdCategory(UUID idCategory) {
		this.idCategory = idCategory;
	}

	public Integer getIdParent() {
		return idParent;
	}

	public void setIdParent(Integer idParent) {
		this.idParent = idParent;
	}

	public boolean isHidden() {
		return hidden;
	}

	public void setHidden(boolean hidden) {
		this.hidden = hidden;
	}

}
