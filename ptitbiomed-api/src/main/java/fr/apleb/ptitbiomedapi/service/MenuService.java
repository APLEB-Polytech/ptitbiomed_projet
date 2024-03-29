package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.exception.MenuNotEmptyException;
import fr.apleb.ptitbiomedapi.exception.NotFoundException;
import fr.apleb.ptitbiomedapi.model.menu.Menu;
import fr.apleb.ptitbiomedapi.model.menu.MenuCreationDto;
import fr.apleb.ptitbiomedapi.model.menu.MenuDto;
import fr.apleb.ptitbiomedapi.repository.ArticleRepository;
import fr.apleb.ptitbiomedapi.repository.CategoryRepository;
import fr.apleb.ptitbiomedapi.repository.menu.MenuRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class MenuService {
	private final MenuRepository menuRepository;
	private final ArticleRepository articleRepository;
	private final CategoryRepository categoryRepository;

	public MenuService(MenuRepository menuRepository,
	                   ArticleRepository articleRepository,
	                   CategoryRepository categoryRepository) {
		this.menuRepository = menuRepository;
		this.articleRepository = articleRepository;
		this.categoryRepository = categoryRepository;
	}

	public List<MenuDto> getAllMenuDto() {
		return this.menuRepository.findByOrderByRankAsc();
	}

	public void createMenu(MenuCreationDto menuDto) {
		if (menuDto.idArticle() != null && !this.articleRepository.existsById(menuDto.idArticle())) {
			throw new NotFoundException();
		}

		if (menuDto.idCategory() != null && !this.categoryRepository.existsById(menuDto.idCategory())) {
			throw new NotFoundException();
		}

		final Menu menu = new Menu();

		menu.setLabel(menuDto.label());
		menu.setRank(menuDto.rank());
		menu.setIdParent(menuDto.idParent());
		menu.setLink(menuDto.link());
		menu.setIdArticle(menuDto.idArticle());
		menu.setIdCategory(menuDto.idCategory());
		menu.setHidden(menuDto.hidden());

		this.menuRepository.save(menu);
	}

	public void sortMenus(Integer idParent, List<Integer> sortedChildrenIds) {
		if (idParent != null && !this.menuRepository.existsById(idParent)) throw new NotFoundException();
		final int menuCount = this.menuRepository.countByIdParent(idParent);
		sortedChildrenIds = sortedChildrenIds.stream().distinct().toList();

		final Map<Integer, Menu> children = this.menuRepository.findAllByIdParent(idParent)
				.stream().collect(Collectors.toMap(Menu::getId, Function.identity()));

		for (Integer id : sortedChildrenIds) {
			if (!children.containsKey(id)) throw new IllegalArgumentException("No menu with id " + id + " and parent " + idParent);
		}

		if (children.size() != sortedChildrenIds.size()) throw new IllegalArgumentException("Missing menu in rank list");

		for (int i = 0; i < sortedChildrenIds.size(); i++) {
			children.get(sortedChildrenIds.get(i)).setRank(i);
		}

		this.menuRepository.saveAll(children.values());
	}

	public void editMenu(MenuDto editedMenu) {
		final Menu menu = this.menuRepository.findById(editedMenu.id()).orElseThrow(NotFoundException::new);

		if (editedMenu.idArticle() != null && !this.articleRepository.existsById(editedMenu.idArticle())) {
			throw new NotFoundException();
		}

		if (editedMenu.idCategory() != null && !this.categoryRepository.existsById(editedMenu.idCategory())) {
			throw new NotFoundException();
		}

		menu.setLabel(editedMenu.label());
		menu.setLink(editedMenu.link());
		menu.setIdArticle(editedMenu.idArticle());
		menu.setIdCategory(editedMenu.idCategory());
		menu.setRank(editedMenu.rank());
		menu.setIdParent(editedMenu.idParent());
		menu.setHidden(editedMenu.hidden());

		this.menuRepository.save(menu);
	}

	public void deleteMenu(int idMenu) {
		if (!this.menuRepository.existsById(idMenu)) {
			throw new NotFoundException();
		}

		if (this.menuRepository.existsByIdParent(idMenu)) {
			throw new MenuNotEmptyException();
		}

		this.menuRepository.deleteById(idMenu);
	}
}
