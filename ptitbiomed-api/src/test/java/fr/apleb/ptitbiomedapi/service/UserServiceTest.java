package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.dto.UserDto;
import fr.apleb.ptitbiomedapi.exception.NotFoundException;
import fr.apleb.ptitbiomedapi.model.user.User;
import fr.apleb.ptitbiomedapi.repository.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@SpringBootTest
class UserServiceTest {

	private final User user1 = new User();
	private final User user2 = new User();

	@Autowired
	private UserService userService;

	@MockBean
	private UserRepository mockRepository;

	@BeforeEach
	@Test
	public void init() {
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

		when(mockRepository.findById(1L)).thenReturn(Optional.of(user1));
		when(mockRepository.findById(2L)).thenReturn(Optional.of(user2));
		when(mockRepository.existsById(3L)).thenReturn(false);
		when(mockRepository.existsById(2L)).thenReturn(true);
		when(mockRepository.findAll()).thenReturn(List.of(user1, user2));
	}


	@Test
	void getAllUsers() {
		List<User> users = this.userService.getAllUsers();
		assertEquals(2, users.size());
		assertEquals(user1, users.get(0));
		assertEquals(user2, users.get(1));
	}

	@Test
	void getUserByID() {
		assertEquals(user1, this.userService.getUserByID(1L).orElseThrow());
		assertEquals(user2, this.userService.getUserByID(2L).orElseThrow());
		assertEquals(Optional.empty(), this.userService.getUserByID(3L));
	}

	@Test
	void getAllUsersDTO() {
		UserDto userDto1 = new UserDto(user1.getId(), user1.getUsername(), user1.getEmail());
		UserDto userDto2 = new UserDto(user2.getId(), user2.getUsername(), user2.getEmail());
		List<UserDto> userDtos = List.of(userDto1, userDto2);
		assertEquals(userDtos, this.userService.getAllUsersDTO());

	}

	@Test
	void deleteUser() {
		assertThrows(NotFoundException.class, () -> this.userService.deleteUser(3L));
		this.userService.deleteUser(2L);
	}
}