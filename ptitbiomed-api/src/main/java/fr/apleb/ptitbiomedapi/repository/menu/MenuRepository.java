package fr.apleb.ptitbiomedapi.repository.menu;

import fr.apleb.ptitbiomedapi.model.menu.Menu;
import fr.apleb.ptitbiomedapi.model.menu.MenuDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<MenuDto> findByOrderByRankAsc();

}