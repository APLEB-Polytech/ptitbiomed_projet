package fr.apleb.ptitbiomedapi.controller;

import fr.apleb.ptitbiomedapi.exception.NotFoundException;
import fr.apleb.ptitbiomedapi.model.Media;
import fr.apleb.ptitbiomedapi.service.FileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/media")
public class MediaController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	private final FileStorageService fileStorageService;

	public MediaController(FileStorageService fileStorageService) {
		this.fileStorageService = fileStorageService;
	}

	@PostMapping("/uploadFile")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Media> uploadFile(@RequestParam("file") MultipartFile file) throws URISyntaxException {
		logger.info("REST POST uploadFile: {}", file.getOriginalFilename());
		Media media = fileStorageService.storeFile(file);
		String fileDownloadUri = ServletUriComponentsBuilder
				.fromCurrentContextPath()
				.path("/api/media/downloadFile/")
				.path(String.valueOf(media.getHash()))
				.toUriString();

		return ResponseEntity.created(new URI(fileDownloadUri)).body(media);
	}

	@GetMapping("/downloadFile/{hashName}")
	public ResponseEntity<byte[]> downloadFile(@PathVariable int hashName) {
		logger.info("REST GET downloadFile: {}", hashName);
		Media media = fileStorageService.getMedia(hashName).orElseThrow(NotFoundException::new);
		byte[] content = fileStorageService.getContent(hashName);

		return ResponseEntity.ok()
				.contentLength(content.length)
				.header(HttpHeaders.CONTENT_TYPE, media.getType())
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + media.getNom())
				.body(content);
	}

	@GetMapping("/{type}")
	public ResponseEntity<List<Media>> getLesMedias(@PathVariable String type) {
		logger.info("REST GET getLesMedias: {}", type);
		List<Media> medias = fileStorageService.getMedias(type);
		return ResponseEntity.ok(medias);
	}
}
