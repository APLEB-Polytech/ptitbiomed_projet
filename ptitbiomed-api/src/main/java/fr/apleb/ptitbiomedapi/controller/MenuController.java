package fr.apleb.ptitbiomedapi.controller;

import fr.apleb.ptitbiomedapi.model.menu.MenuCreationDto;
import fr.apleb.ptitbiomedapi.model.menu.MenuDto;
import fr.apleb.ptitbiomedapi.model.menu.MenuSortDto;
import fr.apleb.ptitbiomedapi.model.menu.SubmenuaCreationDto;
import fr.apleb.ptitbiomedapi.service.MenuService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {
    private final static Logger logger = LoggerFactory.getLogger(MenuController.class);
    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    public ResponseEntity<List<MenuDto>> getAllMenuDto() {
        logger.info("REST GET getAllMenuDto");
        List<MenuDto> menus = this.menuService.getAllMenuDto();
        menus.forEach(menuDto -> menuDto.setSubmenuas(this.menuService.getSubmenuaFromMenu(menuDto.getId().intValue())));
        menus.forEach(menuDto -> menuDto.getSubmenuas().forEach(submenua -> submenua.setSubmenubs(this.menuService.getSubmenubFromMenu(submenua.getId()))));
        return ResponseEntity.ok(menus);
    }

    @PostMapping("/add/menu")
    public ResponseEntity<Void> addMenu(@RequestBody MenuCreationDto menu) {
        logger.info("REST POST addNewMenu: {}", menu.toString());
        menuService.addMenu(menu);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/add/submenua")
    public ResponseEntity<Void> addSubmenua(@RequestBody SubmenuaCreationDto submenua) {
        logger.info("REST POST addNewSubmenua: {}", submenua.toString());
        menuService.addSubmenua(submenua);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{idMenuOrSubmenu}/{idArticle}/{typeMenu}")
    public ResponseEntity<Void> addArticleToMenu(@PathVariable String idArticle, @PathVariable int idMenuOrSubmenu, @PathVariable String typeMenu) {
        logger.info("REST GET addArticleToMenu : {} - {} - {}", idArticle, idMenuOrSubmenu, typeMenu);
        this.menuService.addArticleToMenu(idArticle, idMenuOrSubmenu, typeMenu);
        return ResponseEntity.noContent().build();
    }

	@PostMapping("/rank")
	public ResponseEntity<String> sortMenus(@RequestBody MenuSortDto menuSort) {
		logger.info("REST POST sortMenus : {}", menuSort);
		try {
			final long[] ids = menuSort.items().stream()
					.mapToLong(MenuSortDto.MenuSortListDto::id)
					.distinct().toArray();

			if (ids.length != menuSort.items().size()) {
				throw new IllegalArgumentException("A menu has two ranks");
			}

			if (menuSort.items().stream()
					.map(MenuSortDto.MenuSortListDto::rank)
					.distinct()
					.count() != ids.length) {
				throw new IllegalArgumentException("Two menus have the same rank");
			}
			
			if (menuSort.idMenu() == null) this.menuService.sortMenu(menuSort);
			else if (menuSort.idSousMenu() == null) this.menuService.sortSubmenua(menuSort);
			else this.menuService.sortSubmenub(menuSort);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		return ResponseEntity.noContent().build();
	}
}
