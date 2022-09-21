package fr.apleb.ptitbiomedapi.model.menu;

import java.util.List;

public record MenuSortDto(Integer idMenu, Integer idSousMenu, List<MenuSortListDto> items) {

    public record MenuSortListDto(Integer id, Integer rank) {
    }

}
