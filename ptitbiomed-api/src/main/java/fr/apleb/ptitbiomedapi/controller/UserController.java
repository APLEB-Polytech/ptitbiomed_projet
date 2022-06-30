package fr.apleb.ptitbiomedapi.controller;

import fr.apleb.ptitbiomedapi.model.user.User;
import fr.apleb.ptitbiomedapi.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping
	public ResponseEntity<List<User>> getAllUsers() {
		logger.info("REST GET getAllUsers");
		return ResponseEntity.ok(this.userService.getAllUsers());
	}

	@GetMapping("{idUser}")
	public ResponseEntity<User> getUserByID(@PathVariable long idUser) {
		logger.info("REST GET getUserByID");
		return ResponseEntity.of(this.userService.getUserByID(idUser));
	}
}
