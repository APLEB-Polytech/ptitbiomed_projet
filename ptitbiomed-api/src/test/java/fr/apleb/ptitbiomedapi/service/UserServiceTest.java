package fr.apleb.ptitbiomedapi.service;

import java.util.*;

import fr.apleb.ptitbiomedapi.dto.UserDto;
import fr.apleb.ptitbiomedapi.exception.NotFoundException;
import fr.apleb.ptitbiomedapi.model.user.User;
import fr.apleb.ptitbiomedapi.repository.user.UserRepository;
import fr.apleb.ptitbiomedapi.testutils.UnitTest;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Test class for {@link UserService}.
 */
class UserServiceTest implements UnitTest {

	@InjectMocks
	private UserService userService;

	@Mock
	private UserRepository userRepository;

	private static final User USER_1 = new User();
	private static final User USER_2 = new User();
	private static final List<User> ALL_USERS = List.of(USER_1, USER_2);
	private static final List<UserDto> ALL_USERS_DTO = new ArrayList<>();

	@BeforeAll
	public static void init() {
		USER_1.setId(1L);
		USER_1.setEmail("test1@test.com");
		USER_1.setPassword("passwordtest1");
		USER_1.setUsername("test1");
		USER_1.setRoles(new HashSet<>());

		USER_2.setId(2L);
		USER_2.setEmail("test2@test.com");
		USER_2.setPassword("passwordtest2");
		USER_2.setUsername("test2");
		USER_2.setRoles(new HashSet<>());

		ALL_USERS_DTO.addAll(ALL_USERS.stream()
				.map(user -> new UserDto(user.getId(), user.getUsername(), user.getEmail()))
				.toList());
	}


	@Test
	void Get_all_users() {
		when(userRepository.findAll()).thenReturn(ALL_USERS);

		assertEquals(ALL_USERS, userService.getAllUsers());
	}

	@Test
	void Get_existing_user_by_id() {

		when(userRepository.findById(USER_1.getId())).thenReturn(Optional.of(USER_1));

		assertEquals(USER_1, userService.getUserByID(USER_1.getId()).orElseThrow());
	}

	@Test
	void Get_non_existent_user_by_id_returns_empty_optional() {
		final long nonExistantUserId = 3;

		when(userRepository.findById(nonExistantUserId)).thenReturn(Optional.empty());

		assertEquals(Optional.empty(), userService.getUserByID(nonExistantUserId));
	}

	@Test
	void Get_all_users_dto() {
		when(userRepository.findAll()).thenReturn(ALL_USERS);

		assertEquals(ALL_USERS_DTO, userService.getAllUsersDTO());
	}

	@Test
	void Delete_existing_user() {
		when(userRepository.existsById(USER_1.getId())).thenReturn(true);

		assertDoesNotThrow(() -> userService.deleteUser(USER_1.getId()));

		verify(userRepository, times(1)).deleteById(USER_1.getId());
	}

	@Test
	void Delete_non_existent_user_throws_NotFoundException() {
		final long nonExistentUserId = 3;

		assertThrows(NotFoundException.class, () -> this.userService.deleteUser(nonExistentUserId));

		verify(userRepository, times(0)).deleteById(any());
	}

}
