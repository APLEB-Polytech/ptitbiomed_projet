package fr.apleb.ptitbiomedapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.apleb.ptitbiomedapi.dto.UserDto;
import fr.apleb.ptitbiomedapi.exception.NotFoundException;
import fr.apleb.ptitbiomedapi.model.user.User;
import fr.apleb.ptitbiomedapi.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
class UtilisateurControllerTest {

	private final User user1 = new User();
	private final User user2 = new User();

	private final List<User> users = List.of(user1, user2);

	@MockBean
	private UserService mockUserService;

	@Autowired
	private MockMvc mvc;

	@Autowired
	private ObjectMapper objectMapper;

	@BeforeEach
	void setUp() {
		user1.setId(1L);
		user1.setEmail("test1@test.com");
		user1.setPassword("passwordtest1");
		user1.setUsername("test1");
		user1.setRoles(new HashSet<>());


		user2.setId(2L);
		user2.setEmail("test2@test.com");
		user2.setPassword("passwordtest2");
		user2.setUsername("test2");
		user2.setRoles(new HashSet<>());

		when(mockUserService.getUserByID(1L)).thenReturn(Optional.of(user1));
		when(mockUserService.getUserByID(2L)).thenReturn(Optional.of(user2));
		when(mockUserService.getAllUsers()).thenReturn(users);
	}

	@Test
	void getAllUsers() throws Exception {
		List<UserDto> usersDTO = List.of(
				new UserDto(user1.getId(), user1.getUsername(), user1.getEmail()),
				new UserDto(user2.getId(), user2.getUsername(), user2.getEmail())
		);
		when(mockUserService.getAllUsersDTO()).thenReturn(usersDTO);
		mvc.perform(MockMvcRequestBuilders
						.get("/api/user")
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().json(objectMapper.writeValueAsString(usersDTO)));
	}

	@Test
	void deleteUser() throws Exception {
		Mockito.doThrow(new NotFoundException()).when(mockUserService).deleteUser(1L);
		mvc.perform(MockMvcRequestBuilders
						.delete("/api/user/1")
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isNotFound());
		mvc.perform(MockMvcRequestBuilders
						.delete("/api/user/2")
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isNoContent());
	}

}