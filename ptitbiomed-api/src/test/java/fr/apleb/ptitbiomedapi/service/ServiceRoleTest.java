package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.model.user.ERole;
import fr.apleb.ptitbiomedapi.model.user.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("test")
class ServiceRoleTest {

	@Autowired
	private ServiceRole serviceRole;

	@Test
	void getAllRoles() {
		List<Role> roles = this.serviceRole.getAllRoles();
		assertEquals(3, roles.size());
	}

	@Test
	void getByID() {
		Role user = new Role();
		user.setId(1);
		user.setName(ERole.ROLE_USER);
		assertEquals(user, this.serviceRole.getByID(1).orElseThrow());

		Role modo = new Role();
		modo.setId(2);
		modo.setName(ERole.ROLE_MODERATOR);
		assertEquals(modo, this.serviceRole.getByID(2).orElseThrow());

		Role admin = new Role();
		admin.setId(3);
		admin.setName(ERole.ROLE_ADMIN);
		assertEquals(admin, this.serviceRole.getByID(3).orElseThrow());
	}
}