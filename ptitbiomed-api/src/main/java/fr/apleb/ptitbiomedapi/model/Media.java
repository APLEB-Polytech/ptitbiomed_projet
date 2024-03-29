package fr.apleb.ptitbiomedapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Objects;

@Entity
@Table(name = "media")
public class Media {
	@Id
	@Column(nullable = false)
	private int hash;

	@Column(nullable = false)
	private String nom;

	@Column
	private String type;

	@Column
	private long taille;

	public int getHash() {
		return hash;
	}

	public void setHash(int id) {
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
		return Objects.equals(hash, media.hash) && Objects.equals(nom, media.nom) && Objects.equals(type, media.type) && Objects.equals(taille, media.taille);
	}

	@Override
	public int hashCode() {
		return Objects.hash(hash, nom, type, taille);
	}

	@Override
	public String toString() {
		return "Media{" +
				"hash='" + hash + '\'' +
				", nom='" + nom + '\'' +
				", type='" + type + '\'' +
				", taille='" + taille + '\'' +
				'}';
	}
}