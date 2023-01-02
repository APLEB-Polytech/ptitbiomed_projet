import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {ICategory} from "../../shared/model/ICategory";
import {MatDialog} from "@angular/material/dialog";
import {CategoryCreationComponent} from "./category-creation/category-creation.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: ICategory[] = []
  displayedColumns = [
    'name',
    'article-count',
    'actions',
  ];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories: ICategory[]) => {
        this.categories = categories;
      }
    });
  }

  createCategory(): void {
    const dialogRef = this.dialog.open(CategoryCreationComponent);
    dialogRef.afterClosed().subscribe((newCategory: string) => {
      if (!newCategory) return;
      this.categoryService.createCategory(newCategory).subscribe({
        next: () => {
          this.loadCategories();
          this.snackbar.open('Catégorie crée', 'OK', {duration: 2000});
        },
        error: () => {
          this.snackbar.open('Erreur lord de la création de la catégorie', 'OK', {duration: 10000});
        }
      });
    });
  }

  deleteCategory(category: ICategory): void {
    if (!confirm("Confirmer la suppression de la catégorie '" + category.name + "' ?")) return;
    this.categoryService.deleteCategory(category.uuid!).subscribe({
      next: () => {
        this.loadCategories();
        this.snackbar.open("Catégorie supprimée", 'OK', {duration: 2000});
      },
      error: () => {
        this.snackbar.open("Erreur lors de la suppression de la catégorie", 'OK', {duration: 10000});
      },
    });
  }

}
