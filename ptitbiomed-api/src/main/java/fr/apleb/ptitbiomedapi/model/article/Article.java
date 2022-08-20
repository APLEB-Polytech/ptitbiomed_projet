package fr.apleb.ptitbiomedapi.model.article;

import javax.persistence.*;
import java.time.Instant;
import java.util.UUID;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "article")
public class Article {
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(nullable = false, columnDefinition = "char(36)")
	@Type(type = "uuid-char")
	private UUID uuid;

	@Column(nullable = false)
	private Instant creationTime;

	@Column(nullable = false)
	private Instant updateTime;

	@Column(nullable = false)
	private String author;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private String html;

	public UUID getUuid() {return uuid;}
	public void setUuid(UUID id) {this.uuid = id;}
	public Instant getCreationTime() {return creationTime;}
	public void setCreationTime(Instant creationTime) {this.creationTime = creationTime;}
	public Instant getUpdateTime() {return updateTime;}
	public void setUpdateTime(Instant updateTime) {this.updateTime = updateTime;}
	public String getAuthor() {return author;}
	public void setAuthor(String author) {this.author = author;}
	public String getTitle() {return title;}
	public void setTitle(String title) {this.title = title;}
	public String getHtml() {return html;}
	public void setHtml(String html) {this.html = html;}
}
