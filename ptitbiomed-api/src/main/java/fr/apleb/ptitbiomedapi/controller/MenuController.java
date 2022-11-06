package fr.apleb.ptitbiomedapi.controller;

import fr.apleb.ptitbiomedapi.model.menu.MenuCreationDto;
import fr.apleb.ptitbiomedapi.model.menu.MenuDto;
import fr.apleb.ptitbiomedapi.model.menu.MenuSortDto;
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
		return ResponseEntity.ok(menus);
	}

	@PostMapping
	public ResponseEntity<Void> createMenu(@RequestBody MenuCreationDto menu) {
		logger.info("REST POST addNewMenu: {}", menu.toString());
		menuService.createMenu(menu);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@PutMapping
	public ResponseEntity<Void> editMenu(@RequestBody MenuDto menu) {
		logger.info("REST POST editMenu: {}", menu);
		menuService.editMenu(menu);
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping("/{idMenu}")
	public ResponseEntity<Void> deleteMenu(@PathVariable int idMenu) {
		logger.info("REST DELETE menu : {}", idMenu);
		this.menuService.deleteMenu(idMenu);
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/sort")
	public ResponseEntity<String> sortMenus(@RequestBody MenuSortDto menuSortDto) {
		logger.info("REST POST sortMenus : {} {}", menuSortDto.idParent(), menuSortDto.sortedChildrenIds());
		this.menuService.sortMenus(menuSortDto.idParent(), menuSortDto.sortedChildrenIds());
		return ResponseEntity.noContent().build();
	}
}
