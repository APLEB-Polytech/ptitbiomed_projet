import {Component, OnInit} from '@angular/core';
import {ICategory} from "../../../shared/model/ICategory";
import {CategoryService} from "../../../services/category.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ArticleChooserComponent} from "./article-chooser/article-chooser.component";
import {IArticle} from "../../../shared/model/IArticle";
import {ArticleService} from "../../../articles/article.service";
import {SummaryEditorComponent} from "./summary-editor/summary-editor.component";
import {TitleEditorComponent} from "./title-editor/title-editor.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-category-edition',
  templateUrl: './category-edition.component.html',
  styleUrls: ['./category-edition.component.css']
})
export class CategoryEditionComponent implements OnInit {

  categoryUuid = '';
  category: ICategory | undefined;

  articles: Map<string, IArticle> = new Map<string, IArticle>();

  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if (!this.route.snapshot.params['uuid']) {
      throw new Error("Invalid category UUID");
    }
    this.categoryUuid = this.route.snapshot.params['uuid'];
    this.loadCategory();
  }

  private loadCategory(): void {
    if (!this.categoryUuid) throw "Invalid category UUID";
    this.categoryService.getCategory(this.categoryUuid).subscribe({
      next: (category: ICategory) => {
        this.category = category;
        this.loadArticleHeaders();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.snackbar.open('Catégorie introuvable', 'OK', {duration: 10000});
        } else {
          this.snackbar.open('Une erreur est survenue', 'OK', {duration: 10000});
        }
      },
    });
  }

  drop(event: CdkDragDrop<void>) {
    if (!this.category) return;

    moveItemInArray(this.category.articles, event.previousIndex, event.currentIndex);

    this.categoryService.updateCategory(this.category).subscribe({
      next: () => {
        this.loadCategory();
      },
      error: () => {
        this.snackbar.open('Une erreur est survenue lors de la mise à jour de la catégorie', 'OK', {duration: 10000});
      },
    });
  }

  addArticle() {
    const dialogRef = this.dialog.open(ArticleChooserComponent);
    dialogRef.afterClosed().subscribe((articleId: string) => {
      if (!this.category || !articleId) return;
      this.category.articles.unshift(articleId);

      this.categoryService.updateCategory(this.category).subscribe({
        next: () => {
          this.loadCategory();
          this.snackbar.open('Article ajouté à la catégorie', 'OK', {duration: 2000});
        },
        error: () => {
          this.loadCategory();
          this.snackbar.open('Une erreur est survenue lors de l\'ajout de l\'article à la catégorie', 'OK', {duration: 10000});
        },
      });
    });
  }

  removeArticle(articleId: string): void {
    if (!this.category || !articleId) return;
    if (!confirm("Enlever l’article ?")) return;

    const articleIndex = this.category.articles.indexOf(articleId);
    this.category.articles.splice(articleIndex, 1);

    this.categoryService.updateCategory(this.category).subscribe({
      next: () => {
        this.loadCategory();
        this.snackbar.open('Article retiré de la catégorie', 'OK', {duration: 2000});
      },
      error: () => {
        this.loadCategory();
        this.snackbar.open('Une erreur est survenue lors de la suppression de l’article de la catégorie', 'OK', {duration: 10000});
      },
    });
  }

  editCatTitle(): void {
    if (!this.category) return;

    const dialogRef = this.dialog.open(TitleEditorComponent, {data: this.category.name});

    dialogRef.afterClosed().subscribe((name: string) => {
      if (!this.category) return;
      if (this.category.name === name) return;

      this.category.name = name;

      this.categoryService.updateCategory(this.category).subscribe({
        next: () => {
          this.loadCategory();
          this.snackbar.open('Nom de la catégorie modifié', 'OK', {duration: 2000});
        },
        error: () => {
          this.loadCategory();
          this.snackbar.open('Une erreur est survenue lors de la modification du nom de la catégorie', 'OK', {duration: 10000});
        },
      })
    });
  }

  editSummary(): void {
    if (!this.category) return;
    const dialogRef = this.dialog.open(SummaryEditorComponent, {data: this.category.summaryHtml || ''});
    dialogRef.afterClosed().subscribe((html: string | null) => {
      if (!this.category) return;
      this.category.summaryHtml = html;

      this.categoryService.updateCategory(this.category).subscribe({
        next: () => {
          this.loadCategory();
          this.snackbar.open('Résumé de la catégorie modifié', 'OK', {duration: 2000});
        },
        error: () => {
          this.loadCategory();
          this.snackbar.open('Une erreur est survenue lors de la modification du résumé de la catégorie', 'OK', {duration: 10000});
        },
      });
    });
  }

  private loadArticleHeaders(): void {
    this.articleService.getAllArticles().subscribe((res: HttpResponse<IArticle[]>) => {
      if (!res.body) throw new Error("Invalid response body");
      this.articles.clear();
      res.body.forEach(article => {
        if (!article.uuid) throw new Error("Invalid article UUID");
        this.articles.set(article.uuid, article);
      });
    });
  }

}
