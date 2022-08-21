package fr.apleb.ptitbiomedapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.apleb.ptitbiomedapi.config.security.payload.LoginRequest;
import fr.apleb.ptitbiomedapi.config.security.payload.SignupRequest;
import fr.apleb.ptitbiomedapi.model.user.User;
import fr.apleb.ptitbiomedapi.repository.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
@ActiveProfiles("test")
class AuthControllerTest {

	final User user = new User();

	@MockBean
	UserRepository userMockRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private MockMvc mvc;

	@BeforeEach
	void setUp() {
		user.setId(1L);
		user.setUsername("test");
		user.setPassword(encoder.encode("password"));
		user.setEmail("test@test.com");
		user.setRoles(new HashSet<>());

		when(userMockRepository.findAll()).thenReturn(List.of(user));
		when(userMockRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
		when(userMockRepository.existsByUsername(user.getUsername())).thenReturn(true);
		when(userMockRepository.existsByEmail(user.getEmail())).thenReturn(true);
		when(userMockRepository.findByUsername("bad")).thenReturn(Optional.empty());
		when(userMockRepository.save(any())).then(ans -> {
			User userAjoute = ans.getArgument(0);
			when(userMockRepository.findByUsername(userAjoute.getUsername())).thenReturn(Optional.of(userAjoute));
			return userAjoute;
		});
	}

	@Test
	void authenticateUser() throws Exception {
		LoginRequest correct = new LoginRequest();
		correct.setUsername(user.getUsername());
		correct.setPassword("password");

		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signin")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(correct))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());


		LoginRequest badPassword = new LoginRequest();
		badPassword.setUsername(user.getUsername());
		badPassword.setPassword("badPassword");

		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signin")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(badPassword))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isUnauthorized());

		LoginRequest badUsername = new LoginRequest();
		badUsername.setUsername("badUsername");
		badUsername.setPassword("badPassword");

		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signin")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(badUsername))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isUnauthorized());
	}

	@Test
	void registerUser() throws Exception {

		SignupRequest nullMail = new SignupRequest();
		nullMail.setEmail(null);
		nullMail.setPassword("testdtesttest");
		nullMail.setUsername("test1");
		nullMail.setRole(new HashSet<>());

		SignupRequest nullPassword = new SignupRequest();
		nullPassword.setEmail("nullPassword@null.fr");
		nullPassword.setPassword(null);
		nullPassword.setUsername("test2");
		nullPassword.setRole(new HashSet<>());

		SignupRequest toSmallPassword = new SignupRequest();
		toSmallPassword.setEmail("toosmallpassword@null.fr");
		toSmallPassword.setPassword("rre");
		toSmallPassword.setUsername("test3");
		toSmallPassword.setRole(new HashSet<>());

		SignupRequest nullUsername = new SignupRequest();
		nullUsername.setEmail("nullUsername@test.fr");
		nullUsername.setPassword("erefeifefe");
		nullUsername.setUsername(null);
		nullUsername.setRole(new HashSet<>());

		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signup")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(nullMail))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest());

		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signup")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(nullPassword))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest());
		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signup")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(toSmallPassword))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest());
		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signup")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(nullUsername))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest());

		SignupRequest valid = new SignupRequest();
		valid.setEmail("valid@test.fr");
		valid.setPassword("validpassword");
		valid.setUsername("validUsername");
		valid.setRole(Set.of("admin", "mod", "user"));

		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signup")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(valid))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());


		SignupRequest badRole = new SignupRequest();
		badRole.setEmail("vbadrole@test.fr");
		badRole.setPassword("badRolepassword");
		badRole.setUsername("badRoleUsername");
		badRole.setRole(Set.of("bad_role"));

		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signup")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(badRole))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest());

		SignupRequest existUsername = new SignupRequest();
		existUsername.setEmail("existUsername@test.fr");
		existUsername.setPassword("existUsernamepassword");
		existUsername.setUsername(user.getUsername());
		existUsername.setRole(new HashSet<>());

		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signup")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(existUsername))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest());

		SignupRequest existEmail = new SignupRequest();
		existEmail.setEmail(user.getEmail());
		existEmail.setPassword("existEmailpassword");
		existEmail.setUsername("existEmailUsername");
		existEmail.setRole(new HashSet<>());

		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signup")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(existEmail))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest());

		SignupRequest roleNull = new SignupRequest();
		roleNull.setEmail("roleNull@test.fr");
		roleNull.setPassword("roleNullpassword");
		roleNull.setUsername("roleNullUsername");
		roleNull.setRole(null);

		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signup")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(roleNull))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());
	}
}