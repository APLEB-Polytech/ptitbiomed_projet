package fr.apleb.ptitbiomedapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.apleb.ptitbiomedapi.config.ApplicationProperties;
import fr.apleb.ptitbiomedapi.config.security.payload.LoginRequest;
import fr.apleb.ptitbiomedapi.config.security.payload.SignupRequest;
import fr.apleb.ptitbiomedapi.model.user.User;
import fr.apleb.ptitbiomedapi.repository.user.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
class AuthControllerTest {

	final User user = new User();

	@MockBean
	UserRepository userMockRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private ApplicationProperties applicationProperties;

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
		LoginRequest correct = new LoginRequest(user.getUsername(), "password");

		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signin")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(correct))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());


		LoginRequest badPassword = new LoginRequest(user.getUsername(), "badPassword");

		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signin")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(badPassword))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isUnauthorized());

		LoginRequest badUsername = new LoginRequest("badUsername", "badPassword");

		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signin")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(badUsername))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isUnauthorized());
	}

	@Test
	void registerUser() throws Exception {

		SignupRequest nullMail = new SignupRequest("test1", null, "fjdsfmdsijf");
		SignupRequest nullPassword = new SignupRequest("testdtesttest", "nullPassword@null.fr", null);

		SignupRequest toSmallPassword = new SignupRequest("test3", "toosmallpassword@null.fr", "123");

		SignupRequest nullUsername = new SignupRequest(null, "nullUsername@test.fr", "dsadasdas");

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

		SignupRequest valid = new SignupRequest("validUsername", "valid@test.fr", "validPassword");

		String token = Jwts.builder()
				.setSubject((user.getUsername()))
				.setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + this.applicationProperties.getJwtExpiration()))
				.signWith(SignatureAlgorithm.HS512, this.applicationProperties.getJwtSecret())
				.compact();

		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signup")
						.header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(valid))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());


		SignupRequest existUsername = new SignupRequest(user.getUsername(), "existUsername@test.fr", "existUsernamepassword");

		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signup")
						.header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(existUsername))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest());

		SignupRequest existEmail = new SignupRequest("existEmailUsername", user.getEmail(), "existEmailpassword");

		mvc.perform(MockMvcRequestBuilders
						.post("/api/auth/signup")
						.contentType(MediaType.APPLICATION_JSON)
						.header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
						.content(objectMapper.writeValueAsString(existEmail))
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest());
	}
}