package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.exception.FileStorageException;
import fr.apleb.ptitbiomedapi.exception.NotFoundException;
import fr.apleb.ptitbiomedapi.model.Media;
import fr.apleb.ptitbiomedapi.model.paginator.Paginator;
import fr.apleb.ptitbiomedapi.repository.MediaRepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.Optional;

@Service
public class FileStorageService {
	private final Path fileStorageLocation;
	private final MediaRepository mediaRepository;

	private final ResourceLoader resourceLoader;

	public FileStorageService(Path fileStorageLocation, MediaRepository mediaRepository, ResourceLoader resourceLoader) {
		this.fileStorageLocation = fileStorageLocation;
		this.mediaRepository = mediaRepository;
		this.resourceLoader = resourceLoader;
	}


	public Media storeFile(MultipartFile file) {
		if (file == null) throw new FileStorageException("File is empty!");
		if (file.getOriginalFilename() == null) throw new FileStorageException("File name is empty");

		try {
			Media media = new Media();
			media.setHash(Objects.hashCode(file.getInputStream()));
			media.setNom(StringUtils.cleanPath(file.getOriginalFilename()));
			media.setType(file.getContentType());
			media.setTaille(file.getSize());


			if (media.getNom().contains("..")) {
				throw new FileStorageException("Sorry! Filename contains invalid path sequence " + media.getNom());
			}

			Path targetLocation = this.fileStorageLocation.resolve(getHashNomFichier(media));
			System.out.println(targetLocation);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
			mediaRepository.save(media);

			return media;
		} catch (IOException ex) {
			throw new FileStorageException("Could not store file " + file.getOriginalFilename() + ". Please try again!", ex);
		}
	}

	/**
	 * @param media media
	 * @return hash du fichier . extension du fichier
	 */
	private String getHashNomFichier(Media media) {
		String extension = media.getType().split("/")[1];
		extension = "." + extension;
		return media.getHash() + extension;
	}

	public Optional<Media> getMedia(int hash) {
		return mediaRepository.findById(hash);
	}

	public byte[] getContent(int hash) {
		Media media = getMedia(hash).orElseThrow(NotFoundException::new);
		Path path = fileStorageLocation.resolve(getHashNomFichier(media));
		try {
			return Files.readAllBytes(path);
		} catch (IOException e) {
			throw new NotFoundException();
		}
	}

	public Mono<Resource> getVideo(int hash) {
		Media media = getMedia(hash).orElseThrow(NotFoundException::new);
		return Mono.fromSupplier(() -> this.resourceLoader.getResource(
				"file:" + fileStorageLocation.resolve(getHashNomFichier(media)).toString()
		));
	}

	/**
	 * @param type image ou vidéo
	 * @return Liste des médias
	 */
	public Paginator<Media> getMedias(String type, Paginator<Media> paginator) {
		if (!type.equals("image") && !type.equals("video"))
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Type not found");

		Media[] medias = mediaRepository.findAll()
				.stream()
				.filter(media -> media.getType().startsWith(type))
				.skip((long) paginator.actualPage() * paginator.pageSize())
				.limit(paginator.pageSize())
				.toList()
				.toArray(new Media[0]);
		long nbMedias = mediaRepository.findAll()
				.stream()
				.filter(media -> media.getType().startsWith(type))
				.count();
		return new Paginator<>(medias, paginator.pageSize(), nbMedias, paginator.actualPage());
	}
}
