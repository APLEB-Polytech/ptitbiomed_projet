package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.model.menu.MenuDto;
import fr.apleb.ptitbiomedapi.model.menu.Submenua;
import fr.apleb.ptitbiomedapi.model.menu.Submenub;
import fr.apleb.ptitbiomedapi.repository.menu.MenuRepository;
import fr.apleb.ptitbiomedapi.repository.menu.SubmenuaRepository;
import fr.apleb.ptitbiomedapi.repository.menu.SubmenubRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {
    private final MenuRepository menuRepository;
    private final SubmenuaRepository submenuaRepository;
    private final SubmenubRepository submenubRepository;

    public MenuService(MenuRepository menuRepository, SubmenuaRepository submenuaRepository, SubmenubRepository submenubRepository, SubmenuaRepository submenuaRepository1, SubmenubRepository submenubRepository1) {
        this.menuRepository = menuRepository;
        this.submenuaRepository = submenuaRepository1;
        this.submenubRepository = submenubRepository1;
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
}
