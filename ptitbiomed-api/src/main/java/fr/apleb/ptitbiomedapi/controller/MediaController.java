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
				.path(String.valueOf(media.getUuid()))
				.toUriString();

		return ResponseEntity.created(new URI(fileDownloadUri)).body(media);
	}

	@GetMapping("/downloadFile/{uuid}")
	public ResponseEntity<byte[]> downloadFile(@PathVariable String uuid) {
		logger.info("REST GET downloadFile: {}", uuid);
		Media media = fileStorageService.getMedia(uuid).orElseThrow(NotFoundException::new);
		byte[] content = fileStorageService.getContent(uuid);

		return ResponseEntity.ok()
				.contentLength(content.length)
				.header(HttpHeaders.CONTENT_TYPE, media.getType())
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + media.getNom())
				.body(content);
	}

	@GetMapping(value = "/stream/{uuid}")
	public ResponseEntity<Mono<Resource>> stream(@PathVariable String uuid, @RequestHeader("Range") String range) {
		logger.info("REST GET stream: {}", uuid);
		Media media = fileStorageService.getMedia(uuid).orElseThrow(NotFoundException::new);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_TYPE, media.getType())
				.body(this.fileStorageService.getVideo(uuid));
	}

	@PostMapping("/{type}")
	public ResponseEntity<Paginator<Media>> getLesMedias(@PathVariable String type, @RequestBody Paginator<Media> paginator) {
		logger.info("REST GET getLesMedias: {} {}", type, paginator);
		Paginator<Media> medias = fileStorageService.getMedias(type, paginator);
		return ResponseEntity.ok(medias);
	}
}
