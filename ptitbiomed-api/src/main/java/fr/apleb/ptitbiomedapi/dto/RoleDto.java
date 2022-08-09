package fr.apleb.ptitbiomedapi.dto;

import fr.apleb.ptitbiomedapi.model.user.ERole;

import java.io.Serializable;

public record RoleDto(Integer id, ERole name) implements Serializable {
}
