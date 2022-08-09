package fr.apleb.ptitbiomedapi.dto;

import fr.apleb.ptitbiomedapi.model.user.ERole;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Set;

public record UserDto(Long id, @NotBlank @Size(max = 20) String username, @NotBlank @Size(max = 50) @Email String email,
                      Set<RoleDto> roles) implements Serializable {
	public record RoleDto(Integer id, ERole name) implements Serializable {
	}
}
