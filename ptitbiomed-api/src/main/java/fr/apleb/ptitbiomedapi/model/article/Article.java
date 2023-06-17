package fr.apleb.ptitbiomedapi.model.article;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "article")
public class Article {
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(nullable = false, columnDefinition = "char(36)")
	@JdbcTypeCode(SqlTypes.CHAR)
	private UUID uuid;

	@Column(name = "creation_time", nullable = false)
	private LocalDateTime creationTime;

	@Column(name = "update_time", nullable = false)
	private LocalDateTime updateTime;

	@Column(nullable = false)
	private String author;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private String html;

	public UUID getUuid() {
		return uuid;
	}

	public void setUuid(UUID id) {
		this.uuid = id;
	}

	public LocalDateTime getCreationTime() {
		return creationTime;
	}

	public void setCreationTime(LocalDateTime creationTime) {
		this.creationTime = creationTime;
	}

	public LocalDateTime getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(LocalDateTime updateTime) {
		this.updateTime = updateTime;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getHtml() {
		return html;
	}

	public void setHtml(String html) {
		this.html = html;
	}
}
