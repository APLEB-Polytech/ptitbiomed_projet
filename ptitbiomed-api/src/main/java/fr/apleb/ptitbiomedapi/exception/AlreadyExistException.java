package fr.apleb.ptitbiomedapi.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class AlreadyExistException extends RuntimeException {
	private final static Logger logger = LoggerFactory.getLogger(AlreadyExistException.class);

	public AlreadyExistException(Class<?> classe, String id) {
		super(String.format("Classe %s : %s", classe.getSimpleName(), id));
		logger.error(String.format("Classe %s : %s", classe.getSimpleName(), id));
	}
}
