package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.dto.UserDto;
import fr.apleb.ptitbiomedapi.exception.NotFoundException;
import fr.apleb.ptitbiomedapi.model.user.User;
import fr.apleb.ptitbiomedapi.repository.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {
	private final UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public List<User> getAllUsers() {
		return this.userRepository.findAll();
	}

	public List<UserDto> getAllUsersDTO() {
		return this.userRepository.findAll()
				.stream()
				.map(this::transformUserToUserDTO)
				.toList();
	}

	public void deleteUser(long idUser) {
		if (!this.userRepository.existsById(idUser)) {
			throw new NotFoundException();
		}
		this.userRepository.deleteById(idUser);
	}

	public Optional<User> getUserByID(long idUser) {
		return this.userRepository.findById(idUser);
	}

	private UserDto transformUserToUserDTO(User user) {
		Set<UserDto.RoleDto> roleDtos = user.getRoles()
				.stream()
				.map(role -> new UserDto.RoleDto(role.getId(), role.getName()))
				.collect(Collectors.toSet());
		return new UserDto(
				user.getId(),
				user.getUsername(),
				user.getEmail(),
				roleDtos
		);
	}
}
