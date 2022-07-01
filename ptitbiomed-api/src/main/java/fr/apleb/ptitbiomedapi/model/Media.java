package fr.apleb.ptitbiomedapi.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = "media")
public class Media {
	@Id
	@Column(nullable = false)
	private String hash;

	@Column(nullable = false)
	private String nom;

	@Column
	private String type;

	public String getHash() {
		return hash;
	}

	public void setHash(String id) {
		this.hash = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Media media = (Media) o;
		return Objects.equals(hash, media.hash) && Objects.equals(nom, media.nom) && Objects.equals(type, media.type);
	}

	@Override
	public int hashCode() {
		return Objects.hash(hash, nom, type);
	}

	@Override
	public String toString() {
		return "Media{" +
				"hash='" + hash + '\'' +
				", nom='" + nom + '\'' +
				", type='" + type + '\'' +
				'}';
	}
}