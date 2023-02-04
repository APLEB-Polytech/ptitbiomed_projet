package fr.apleb.ptitbiomedapi.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

public record UserDtoEdit(Long id, @NotBlank @Size(max = 20) String username,
                          @NotBlank @Size(max = 50) @Email String email,
                          @NotBlank @Size(max = 120) String password) implements Serializable {

	@Override
	public String toString() {
		return "UserDtoEdit{" +
				"id=" + id +
				", username='" + username + '\'' +
				", email='" + email + '\'' +
				'}';
	}
}
