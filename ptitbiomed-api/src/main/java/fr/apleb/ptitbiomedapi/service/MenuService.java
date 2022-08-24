package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.model.menu.*;
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
}
