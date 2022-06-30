package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.model.user.Role;
import fr.apleb.ptitbiomedapi.repository.user.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceRole {
	private final RoleRepository roleRepository;

	public ServiceRole(RoleRepository roleRepository) {
		this.roleRepository = roleRepository;
	}

	public List<Role> getAllRoles() {
		return this.roleRepository.findAll();
	}

	public Optional<Role> getByID(int idRole) {
		return this.roleRepository.findById(idRole);
	}
}
