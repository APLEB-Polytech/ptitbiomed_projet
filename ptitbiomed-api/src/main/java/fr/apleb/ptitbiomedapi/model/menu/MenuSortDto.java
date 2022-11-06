package fr.apleb.ptitbiomedapi.model.menu;

import java.util.List;

public record MenuSortDto(Integer idParent, List<Integer> sortedChildrenIds) {}
