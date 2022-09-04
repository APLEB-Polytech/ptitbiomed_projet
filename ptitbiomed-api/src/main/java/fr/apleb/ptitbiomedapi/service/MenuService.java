package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.model.menu.*;
import fr.apleb.ptitbiomedapi.repository.menu.MenuRepository;
import fr.apleb.ptitbiomedapi.repository.menu.SubmenuaRepository;
import fr.apleb.ptitbiomedapi.repository.menu.SubmenubRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

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
}
