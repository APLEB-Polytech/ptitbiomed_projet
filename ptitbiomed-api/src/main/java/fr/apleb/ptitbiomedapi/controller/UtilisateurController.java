package fr.apleb.ptitbiomedapi.controller;

import fr.apleb.ptitbiomedapi.dto.UserDto;
import fr.apleb.ptitbiomedapi.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UtilisateurController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	private final UserService userService;


	public UtilisateurController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping
	public ResponseEntity<List<UserDto>> getAllUsers() {
		logger.info("REST GET getAllUsers");
		return ResponseEntity.ok(this.userService.getAllUsersDTO());
	}

	@DeleteMapping("{idUser}")
	public ResponseEntity<Void> deleteUser(@PathVariable long idUser) {
		logger.info("REST DELETE deleteUser : {}", idUser);
		this.userService.deleteUser(idUser);
		return ResponseEntity.noContent().build();
	}
}
