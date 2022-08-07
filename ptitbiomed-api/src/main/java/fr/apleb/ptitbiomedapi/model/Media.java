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
	private String uuid;

	@Column(nullable = false)
	private String nom;

	@Column
	private String type;

	@Column
	private long taille;

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String id) {
		this.uuid = id;
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

	public long getTaille() {
		return taille;
	}

	public void setTaille(long taille) {
		this.taille = taille;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Media media = (Media) o;
		return Objects.equals(uuid, media.uuid) && Objects.equals(nom, media.nom) && Objects.equals(type, media.type) && Objects.equals(taille, media.taille);
	}

	@Override
	public int hashCode() {
		return Objects.hash(uuid, nom, type, taille);
	}

	@Override
	public String toString() {
		return "Media{" +
				"hash='" + uuid + '\'' +
				", nom='" + nom + '\'' +
				", type='" + type + '\'' +
				", taille='" + taille + '\'' +
				'}';
	}
}