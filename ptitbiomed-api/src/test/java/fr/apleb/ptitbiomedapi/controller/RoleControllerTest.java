package fr.apleb.ptitbiomedapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.apleb.ptitbiomedapi.model.user.ERole;
import fr.apleb.ptitbiomedapi.model.user.Role;
import fr.apleb.ptitbiomedapi.service.ServiceRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@ActiveProfiles("test")
@SpringBootTest
class RoleControllerTest {

	Role user = new Role();
	Role modo = new Role();
	Role admin = new Role();

	List<Role> roles = List.of(user, modo, admin);
	@Autowired
	private MockMvc mvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private ServiceRole serviceRole;

	@BeforeEach
	void setUp() {

		user.setId(1);
		user.setName(ERole.ROLE_USER);


		modo.setId(2);
		modo.setName(ERole.ROLE_MODERATOR);

		admin.setId(3);
		admin.setName(ERole.ROLE_ADMIN);

		when(serviceRole.getAllRoles()).thenReturn(roles);
		when(serviceRole.getByID(1)).thenReturn(Optional.of(user));
		when(serviceRole.getByID(2)).thenReturn(Optional.of(modo));
		when(serviceRole.getByID(3)).thenReturn(Optional.of(admin));
		when(serviceRole.getByID(4)).thenReturn(Optional.empty());

	}


	@Test
	void getAllRoles() throws Exception {
		mvc.perform(MockMvcRequestBuilders
						.get("/api/roles")
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().json(objectMapper.writeValueAsString(roles)));
	}

	@Test
	void getRoleByID() throws Exception {
		mvc.perform(MockMvcRequestBuilders
						.get("/api/roles/1")
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().json(objectMapper.writeValueAsString(user)));

		mvc.perform(MockMvcRequestBuilders
						.get("/api/roles/2")
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().json(objectMapper.writeValueAsString(modo)));

		mvc.perform(MockMvcRequestBuilders
						.get("/api/roles/3")
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().json(objectMapper.writeValueAsString(admin)));

		mvc.perform(MockMvcRequestBuilders
						.get("/api/roles/4")
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isNotFound());
	}
}