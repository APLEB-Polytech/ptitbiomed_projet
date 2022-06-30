package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.model.user.User;
import fr.apleb.ptitbiomedapi.repository.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
	private final UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public List<User> getAllUsers() {
		return this.userRepository.findAll();
	}

	public Optional<User> getUserByID(long idUser) {
		return this.userRepository.findById(idUser);
	}
}
