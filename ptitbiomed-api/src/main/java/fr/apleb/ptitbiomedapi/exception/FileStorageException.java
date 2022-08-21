package fr.apleb.ptitbiomedapi.exception;

public class FileStorageException extends RuntimeException {
	public FileStorageException() {
		super();
	}

	public FileStorageException(String message) {
		super(message);
	}

	public FileStorageException(String message, Throwable cause) {
		super(message, cause);
	}

	public FileStorageException(Throwable cause) {
		super(cause);
	}

	protected FileStorageException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}
}
