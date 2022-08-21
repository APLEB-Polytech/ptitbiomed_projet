package fr.apleb.ptitbiomedapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.apleb.ptitbiomedapi.service.FileStorageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@AutoConfigureMockMvc
@SpringBootTest
@ActiveProfiles("test")
class MediaControllerTest {

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private MockMvc mvc;

	@MockBean
	private FileStorageService fileStorageServiceMock;

	@BeforeEach
	void setUp() {
	}

	@Test
	void uploadFile() {
	}

	@Test
	void downloadFile() {
	}

	@Test
	void getLesMedias() {
	}
}