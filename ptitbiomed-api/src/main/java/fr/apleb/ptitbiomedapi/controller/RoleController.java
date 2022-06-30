package fr.apleb.ptitbiomedapi.controller;

import fr.apleb.ptitbiomedapi.model.user.Role;
import fr.apleb.ptitbiomedapi.service.ServiceRole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {
	private final static Logger logger = LoggerFactory.getLogger(RoleController.class);
	private final ServiceRole serviceRole;

	public RoleController(ServiceRole serviceRole) {
		this.serviceRole = serviceRole;
	}

	@GetMapping
	public ResponseEntity<List<Role>> getAllRoles() {
		logger.info("REST GET getAllRoles");
		return ResponseEntity.ok(this.serviceRole.getAllRoles());
	}

	@GetMapping("{idRole}")
	public ResponseEntity<Role> getRoleByID(@PathVariable int idRole) {
		logger.info("REST GET getRoleByID : {}", idRole);
		return ResponseEntity.of(this.serviceRole.getByID(idRole));
	}


}
