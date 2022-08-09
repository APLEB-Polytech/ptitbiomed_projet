package fr.apleb.ptitbiomedapi.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Set;

public record UserDtoEdit(Long id, @NotBlank @Size(max = 20) String username,
                          @NotBlank @Size(max = 50) @Email String email, @NotBlank @Size(max = 120) String password,
                          Set<RoleDto> roles) implements Serializable {

	@Override
	public String toString() {
		return "UserDtoEdit{" +
				"id=" + id +
				", username='" + username + '\'' +
				", email='" + email + '\'' +
				", roles=" + roles +
				'}';
	}
}
