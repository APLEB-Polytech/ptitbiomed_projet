package fr.apleb.ptitbiomedapi.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;

public record UserDto(Long id, @NotBlank @Size(max = 20) String username,
                      @NotBlank @Size(max = 50) @Email String email) implements Serializable {
}
