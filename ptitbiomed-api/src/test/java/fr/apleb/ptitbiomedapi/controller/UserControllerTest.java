package fr.apleb.ptitbiomedapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.apleb.ptitbiomedapi.model.user.User;
import fr.apleb.ptitbiomedapi.service.UserService;
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

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
@ActiveProfiles("test")
class UserControllerTest {

	private final User user1 = new User();
	private final User user2 = new User();

	private final List<User> users = List.of(user1, user2);

	@MockBean
	private UserService mockRepository;

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

		when(mockRepository.getUserByID(1L)).thenReturn(Optional.of(user1));
		when(mockRepository.getUserByID(2L)).thenReturn(Optional.of(user2));
		when(mockRepository.getAllUsers()).thenReturn(users);
	}

	@Test
	void getAllUsers() throws Exception {
		mvc.perform(MockMvcRequestBuilders
						.get("/api/user")
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().json(objectMapper.writeValueAsString(users)));
	}

	@Test
	void getUserByID() throws Exception {
		mvc.perform(MockMvcRequestBuilders
						.get("/api/user/1")
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().json(objectMapper.writeValueAsString(user1)));

		mvc.perform(MockMvcRequestBuilders
						.get("/api/user/2")
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().json(objectMapper.writeValueAsString(user2)));

		mvc.perform(MockMvcRequestBuilders
						.get("/api/user/3")
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isNotFound());
	}
}