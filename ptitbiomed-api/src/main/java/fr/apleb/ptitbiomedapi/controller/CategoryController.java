package fr.apleb.ptitbiomedapi.controller;

import fr.apleb.ptitbiomedapi.dto.CategoryDto;
import fr.apleb.ptitbiomedapi.service.CategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	private final CategoryService categoryService;

	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}

	@GetMapping
	public ResponseEntity<List<CategoryDto>> getAllCategories() {
		logger.info("REST GET allCategories");
		return ResponseEntity.ok().body(this.categoryService.getAllCategories());
	}

	@GetMapping("/{uuid}")
	public ResponseEntity<CategoryDto> getCategoryByUUID(@PathVariable UUID uuid) {
		logger.info("REST GET categoryByUUID : {}", uuid);
		return ResponseEntity.ok().body(this.categoryService.getCategoryByUUID(uuid));
	}

	@PostMapping
	public ResponseEntity<Void> createCategory(@RequestBody String name) {
		logger.info("REST POST createCategory: {}", name);
		this.categoryService.createCategory(name);
		return ResponseEntity.noContent().build();
	}

	@PutMapping
	public ResponseEntity<Void> updateCategory(@RequestBody CategoryDto category) {
		logger.info("REST PUT updateCategory: {}", category.toString());
		this.categoryService.updateCategory(category);
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping("/{uuid}")
	public ResponseEntity<Void> deleteCategory(@PathVariable UUID uuid) {
		logger.info("REST DELETE category: {}", uuid);
		this.categoryService.deleteCategory(uuid);
		return ResponseEntity.noContent().build();
	}

}
