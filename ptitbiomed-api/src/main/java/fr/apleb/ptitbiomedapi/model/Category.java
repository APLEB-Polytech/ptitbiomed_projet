package fr.apleb.ptitbiomedapi.model;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Entity
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(nullable = false, columnDefinition = "char(36)")
	@JdbcTypeCode(SqlTypes.CHAR)
	private UUID uuid;

	@Column(nullable = false)
	private String name;

	@Column
	private String summaryHtml;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "category", orphanRemoval = true)
	@OrderBy("rank")
	private List<CategoryArticle> articles;

	protected Category() {}

	public Category(String name) {
		this.uuid = null;
		this.name = name;
		this.summaryHtml = null;
		this.articles = Collections.emptyList();
	}

	public UUID getUuid() {
		return uuid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSummaryHtml() {
		return summaryHtml;
	}

	public void setSummaryHtml(String summaryHtml) {
		this.summaryHtml = summaryHtml;
	}

	public List<CategoryArticle> getArticles() {
		return articles;
	}

	public void setArticles(List<CategoryArticle> articles) {
		this.articles.clear();
		this.articles.addAll(articles);
	}

	@Override
	public String toString() {
		return "Category{" +
				"uuid=" + uuid +
				", name='" + name + '\'' +
				", articles=" + articles +
				'}';
	}

}
