package fr.apleb.ptitbiomedapi.controller;

import fr.apleb.ptitbiomedapi.exception.NotFoundException;
import fr.apleb.ptitbiomedapi.model.Media;
import fr.apleb.ptitbiomedapi.model.paginator.Paginator;
import fr.apleb.ptitbiomedapi.service.FileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import reactor.core.publisher.Mono;

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
	@PreAuthorize("isAuthenticated()")
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

	@GetMapping(value = "/stream/{hashName}")
	public ResponseEntity<Mono<Resource>> stream(@PathVariable int hashName, @RequestHeader("Range") String range) {
		logger.info("REST GET stream: {}", hashName);
		Media media = fileStorageService.getMedia(hashName).orElseThrow(NotFoundException::new);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_TYPE, media.getType())
				.body(this.fileStorageService.getVideo(hashName));
	}

	@PostMapping("/{type}")
	public ResponseEntity<Paginator<Media>> getLesMedias(@PathVariable String type, @RequestBody Paginator<Media> paginator) {
		logger.info("REST GET getLesMedias: {} {}", type, paginator);
		Paginator<Media> medias = fileStorageService.getMedias(type, paginator);
		return ResponseEntity.ok(medias);
	}

	@GetMapping("/{type}")
	public ResponseEntity<List<Media>> getLesMedias(@PathVariable String type) {
		logger.info("REST GET getLesMedias: {}", type);
		return ResponseEntity.ok(fileStorageService.getAllMedias(type));
	}

	@DeleteMapping("/{hash}")
	public ResponseEntity<Void> deleteMedia(@PathVariable int hash) {
		logger.info("REST DELETE deleteMedia : {}", hash);
		this.fileStorageService.deleteMedia(hash);
		return ResponseEntity.noContent().build();
	}
}
