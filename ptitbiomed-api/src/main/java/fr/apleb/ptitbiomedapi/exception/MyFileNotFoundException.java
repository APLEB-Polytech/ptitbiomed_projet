package fr.apleb.ptitbiomedapi.exception;

public class MyFileNotFoundException extends RuntimeException {
	public MyFileNotFoundException() {
		super();
	}

	public MyFileNotFoundException(String message) {
		super(message);
	}

	public MyFileNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public MyFileNotFoundException(Throwable cause) {
		super(cause);
	}

	protected MyFileNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}
}
