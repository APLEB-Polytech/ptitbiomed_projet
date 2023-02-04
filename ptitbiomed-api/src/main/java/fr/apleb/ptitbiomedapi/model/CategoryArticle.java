package fr.apleb.ptitbiomedapi.model;

import fr.apleb.ptitbiomedapi.model.article.Article;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "category_articles")
public class CategoryArticle {

	@Embeddable
	public static final class ID implements Serializable {

		@Column(nullable = false, columnDefinition = "char(36)")
		@JdbcTypeCode(SqlTypes.CHAR)
		private UUID categoryUuid;

		@Column(nullable = false, columnDefinition = "char(36)")
		@JdbcTypeCode(SqlTypes.CHAR)
		private UUID articleUuid;

		public ID() {}

		public ID(UUID categoryUuid, UUID articleUuid) {
			this.categoryUuid = categoryUuid;
			this.articleUuid = articleUuid;
		}

		public UUID getCategoryUuid() {
			return categoryUuid;
		}

		public UUID getArticleUuid() {
			return articleUuid;
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

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("categoryUuid")
	@JoinColumn(name = "category_uuid", columnDefinition = "char(36)")
	private Category category;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("articleUuid")
	@JoinColumn(name = "article_uuid", columnDefinition = "char(36)")
	private Article article;

	@Column(nullable = false)
	private int rank;

	protected CategoryArticle() {}

	public CategoryArticle(Category category, Article article, int rank) {
		this.id = new ID(category.getUuid(), article.getUuid());
		this.category = category;
		this.article = article;
		this.rank = rank;
	}

	public ID getId() {
		return id;
	}

	public Category getCategory() {
		return category;
	}

	public Article getArticle() {
		return article;
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
