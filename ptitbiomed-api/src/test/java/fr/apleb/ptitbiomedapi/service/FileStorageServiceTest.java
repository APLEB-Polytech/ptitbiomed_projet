package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.exception.FileStorageException;
import fr.apleb.ptitbiomedapi.model.Media;
import fr.apleb.ptitbiomedapi.model.paginator.Paginator;
import fr.apleb.ptitbiomedapi.repository.MediaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@SpringBootTest
@ActiveProfiles("test")
class FileStorageServiceTest {

	private final Media image = new Media();
	private final Media image2 = new Media();
	private final Media video = new Media();
	private final Media video2 = new Media();
	private final List<Media> medias = List.of(image, image2, video, video2);
	@MockBean
	private MediaRepository mediaRepositoryMock;
	@Autowired
	private FileStorageService fileStorageService;

	@BeforeEach
	void setUp() {
		image.setHash(123456);
		image.setType("image/png");
		image.setTaille(500);
		image.setNom("ImageMedia");

		image2.setHash(456789);
		image2.setType("image/png");
		image2.setTaille(500);
		image2.setNom("Image2");

		video.setHash(98765);
		video.setType("video/m4a");
		video.setTaille(500);
		video.setNom("VideoMedia");

		video2.setHash(97483);
		video2.setType("video/m4a");
		video2.setTaille(500);
		video2.setNom("VideoMedia2");


		when(mediaRepositoryMock.findAll()).thenReturn(medias);
		when(mediaRepositoryMock.findById(image.getHash())).thenReturn(Optional.of(image));
		when(mediaRepositoryMock.findById(image2.getHash())).thenReturn(Optional.of(image2));
		when(mediaRepositoryMock.findById(video.getHash())).thenReturn(Optional.of(video));
		when(mediaRepositoryMock.findById(video2.getHash())).thenReturn(Optional.of(video2));
		when(mediaRepositoryMock.findById(0)).thenReturn(Optional.empty());
	}

	@Test
	void storeFile() throws IOException {
		String contentStr = "content";
		byte[] content = contentStr.getBytes();
		MockMultipartFile mock = new MockMultipartFile("test", "test", "image/png", content);
		MockMultipartFile invalidName = new MockMultipartFile("test..test2", "test..test2", "image/png", content);

		assertThrows(FileStorageException.class, () -> this.fileStorageService.storeFile(invalidName));

		Media media = this.fileStorageService.storeFile(mock);
		assertEquals("test", media.getNom());
		assertEquals(mock.getSize(), media.getTaille());

	}

	@Test
	void getMedia() {
		assertEquals(Optional.of(image), this.fileStorageService.getMedia(image.getHash()));
		assertEquals(Optional.of(image2), this.fileStorageService.getMedia(image2.getHash()));
		assertEquals(Optional.of(video), this.fileStorageService.getMedia(video.getHash()));
		assertEquals(Optional.of(video2), this.fileStorageService.getMedia(video2.getHash()));
		assertEquals(Optional.empty(), this.fileStorageService.getMedia(0));
	}

	@Test
	void getContent() {

	}

	@Test
	void getMedias() {
		assertThrows(ResponseStatusException.class, () -> fileStorageService.getMedias("badType", new Paginator<>(null, 2, 0, 0)));
		Paginator<Media> paginator = this.fileStorageService.getMedias("image", new Paginator<>(null, 1, 0, 0));
		assertEquals(1, paginator.data().length);
		assertEquals(2, paginator.itemMax());
		assertEquals(image, paginator.data()[0]);

		paginator = this.fileStorageService.getMedias("image", new Paginator<>(null, 1, 0, 1));
		assertEquals(1, paginator.data().length);
		assertEquals(2, paginator.itemMax());
		assertEquals(image2, paginator.data()[0]);

		paginator = this.fileStorageService.getMedias("image", new Paginator<>(null, 1, 0, 2));
		assertEquals(0, paginator.data().length);
		assertEquals(2, paginator.itemMax());


		paginator = this.fileStorageService.getMedias("video", new Paginator<>(null, 1, 0, 0));
		assertEquals(1, paginator.data().length);
		assertEquals(2, paginator.itemMax());
		assertEquals(video, paginator.data()[0]);

		paginator = this.fileStorageService.getMedias("video", new Paginator<>(null, 1, 0, 1));
		assertEquals(1, paginator.data().length);
		assertEquals(2, paginator.itemMax());
		assertEquals(video2, paginator.data()[0]);

		paginator = this.fileStorageService.getMedias("video", new Paginator<>(null, 1, 0, 2));
		assertEquals(0, paginator.data().length);
		assertEquals(2, paginator.itemMax());
	}
}