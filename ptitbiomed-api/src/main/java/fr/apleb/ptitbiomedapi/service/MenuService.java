package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.model.menu.*;
import fr.apleb.ptitbiomedapi.repository.menu.MenuRepository;
import fr.apleb.ptitbiomedapi.repository.menu.SubmenuaRepository;
import fr.apleb.ptitbiomedapi.repository.menu.SubmenubRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@Service
public class MenuService {
    private final MenuRepository menuRepository;
    private final SubmenuaRepository submenuaRepository;
    private final SubmenubRepository submenubRepository;

    public MenuService(MenuRepository menuRepository, SubmenuaRepository submenuaRepository, SubmenubRepository submenubRepository) {
        this.menuRepository = menuRepository;
        this.submenuaRepository = submenuaRepository;
        this.submenubRepository = submenubRepository;
    }

    public List<MenuDto> getAllMenuDto() {
        return this.menuRepository.findByOrderByRankAsc();
    }

    public List<Submenua> getSubmenuaFromMenu(int idParent) {
        return this.submenuaRepository.findByIdParent(idParent);
    }

    public List<Submenub> getSubmenubFromMenu(int idParent) {
        return this.submenubRepository.findByIdParent(idParent);
    }

    public void addMenu(MenuCreationDto menuDto) {
        Menu menu = new Menu();
        menu.setLabel(menuDto.label());
	    menu.setRank(menuDto.rank());
	    this.menuRepository.save(menu);
    }

	public void addSubmenua(SubmenuaCreationDto submenuaDto) {
		Submenua submenua = new Submenua();
		submenua.setLabel(submenuaDto.label());
		submenua.setIdParent(submenuaDto.idParent());
		this.submenuaRepository.save(submenua);
	}

	public void addArticleToMenu(String idArticle, int idMenuOrSubmenu, String typeMenu) {
		if (!(typeMenu.equals("menu") || typeMenu.equals("submenua") || typeMenu.equals("submenub"))) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Type de menu invalide");
		}
		switch (typeMenu) {
			case "menu" -> {
				Menu menu = this.menuRepository.findById((long) idMenuOrSubmenu).orElseThrow();
				menu.setLink("/article/view/" + idArticle);
				this.menuRepository.save(menu);
			}
			case "submenua" -> {
				Submenua menua = this.submenuaRepository.findById(idMenuOrSubmenu).orElseThrow();
				menua.setLink("/article/view/" + idArticle);
				this.submenuaRepository.save(menua);
			}
			case "submenub" -> {
				Submenub menub = this.submenubRepository.findById(idMenuOrSubmenu).orElseThrow();
				menub.setLink("/article/view/" + idArticle);
				this.submenubRepository.save(menub);
			}
		}
	}

	public void sortMenu(MenuSortDto menuSort) {
		if (menuSort.items().size() != this.menuRepository.count()) {
			throw new IllegalArgumentException("Missing menu in rank list");
		}

		for (var item : menuSort.items()) {
			if (!this.menuRepository.existsById(Objects.requireNonNull(item.id()).longValue())) {
				throw new IllegalArgumentException("No menu with the id " + item.id());
			}
		}

		for (MenuSortDto.MenuSortListDto item : menuSort.items()) {
			final Menu menu = this.menuRepository.findById(item.id().longValue()).orElseThrow(); // CAN'T THROW
			menu.setRank(item.rank());
			this.menuRepository.save(menu);
		}
	}

	public void sortSubmenua(MenuSortDto menuSort) {
		if (menuSort.items().size() != this.submenuaRepository.countByIdParent(menuSort.idMenu())) {
			throw new IllegalArgumentException("Missing submenua in rank list");
		}

		for (var item : menuSort.items()) {
			if (!this.submenuaRepository.existsById(item.id())) {
				throw new IllegalArgumentException("No submenua with the id " + item.id());
			}
		}

		for (MenuSortDto.MenuSortListDto item : menuSort.items()) {
			final Submenua submenua = this.submenuaRepository.findById(item.id()).orElseThrow(); // CAN'T THROW
			submenua.setRank(item.rank());
			this.submenuaRepository.save(submenua);
		}
	}

	public void sortSubmenub(MenuSortDto menuSort) {
		if (menuSort.items().size() != this.submenubRepository.countByIdParent(menuSort.idSousMenu())) {
			throw new IllegalArgumentException("Missing submenub in rank list");
		}

		for (var item : menuSort.items()) {
			if (!this.submenubRepository.existsById(item.id())) {
				throw new IllegalArgumentException("No submenub with the id " + item.id());
			}
		}

		for (MenuSortDto.MenuSortListDto item : menuSort.items()) {
			final Submenub submenub = this.submenubRepository.findById(item.id()).orElseThrow(); // CAN'T THROW
			submenub.setRank(item.rank());
			this.submenubRepository.save(submenub);
		}
	}

}
