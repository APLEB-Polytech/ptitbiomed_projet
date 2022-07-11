package fr.apleb.ptitbiomedapi.model.paginator;

import java.io.Serializable;
import java.util.Arrays;

public record Paginator<T>(T[] data, int pageSize, long itemMax, int actualPage) implements Serializable {
	@Override
	public String toString() {
		return "Paginator{" +
				"data=" + Arrays.toString(data) +
				", pageSize=" + pageSize +
				", itemMax=" + itemMax +
				", actualPage=" + actualPage +
				'}';
	}
}