package fr.apleb.ptitbiomedapi.controller;

import fr.apleb.ptitbiomedapi.model.menu.MenuDto;
import fr.apleb.ptitbiomedapi.service.MenuService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {
    private final static Logger logger = LoggerFactory.getLogger(RoleController.class);
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



    /*
    @GetMapping("/{id}/submenua")
    public ResponseEntity<List<Submenua>> getSubmenuaFromMenu(@PathVariable int id) {
        logger.info("REST GET getSubmenuaFromMenu id menu : " + id);
        return ResponseEntity.ok(this.menuService.getSubmenuaFromMenu(id));
    }

    @GetMapping("/{id}/submenub")
    public ResponseEntity<List<Submenub>> getSubmenubFromMenu(@PathVariable int id) {
        logger.info("REST GET getSubmenubFromMenu id submenua : " + id);
        return ResponseEntity.ok(this.menuService.getSubmenubFromMenu(id));
    }*/
}
