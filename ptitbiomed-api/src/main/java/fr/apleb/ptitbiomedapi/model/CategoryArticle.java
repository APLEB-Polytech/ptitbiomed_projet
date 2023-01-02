package fr.apleb.ptitbiomedapi.model;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "category_articles")
public class CategoryArticle {

	@Embeddable
	public static final class ID implements Serializable {

		@Column(nullable = false, columnDefinition = "char(36)")
		@Type(type = "uuid-char")
		private UUID categoryUuid;

		@Column(nullable = false, columnDefinition = "char(36)")
		@Type(type = "uuid-char")
		private UUID articleUuid;

		public ID() {}

		public ID(UUID categoryUuid, UUID articleUuid) {
			this.categoryUuid = categoryUuid;
			this.articleUuid = articleUuid;
		}

		public UUID getCategoryUuid() {
			return categoryUuid;
		}

		public void setCategoryUuid(UUID categoryUuid) {
			this.categoryUuid = categoryUuid;
		}

		public UUID getArticleUuid() {
			return articleUuid;
		}

		public void setArticleUuid(UUID articleUuid) {
			this.articleUuid = articleUuid;
		}

		@Override
		public String toString() {
			return "ID{" +
					"categoryUuid=" + categoryUuid +
					", articleUuid=" + articleUuid +
					'}';
		}

	}

	@EmbeddedId
	private ID id;

	@Column(nullable = false)
	private int rank;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("categoryUuid")
	@JoinColumn(name = "category_uuid", columnDefinition = "char(36)")
	private Category category;

	protected CategoryArticle() {}

	public CategoryArticle(ID id, int rank) {
		this.id = id;
		this.rank = rank;
	}

	public ID getId() {
		return id;
	}

	public Category getCategory() {
		return category;
	}

	public int getRank() {
		return rank;
	}

	public void setRank(int rank) {
		this.rank = rank;
	}

	@Override
	public String toString() {
		return "CategoryArticle{" +
				"id=" + id +
				", rank=" + rank +
				'}';
	}

}
