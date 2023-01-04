import {Component, OnInit} from '@angular/core';
import {ICategory} from "../../../shared/model/ICategory";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoryService} from "../../../services/category.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ArticleChooserComponent} from "./article-chooser/article-chooser.component";
import {IArticle} from "../../../shared/model/IArticle";
import {ArticleService} from "../../../articles/article.service";

@Component({
  selector: 'app-category-edition',
  templateUrl: './category-edition.component.html',
  styleUrls: ['./category-edition.component.css']
})
export class CategoryEditionComponent implements OnInit {

  categoryUuid: string = '';
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
    this.categoryUuid = this.route.snapshot.paramMap.get('uuid')!;
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

  private loadArticleHeaders(): void {
    this.articleService.getAllArticles().subscribe((res: HttpResponse<IArticle[]>) => {
      this.articles.clear();
      res.body!.forEach(article => {
        this.articles.set(article.uuid!, article);
      });
    });
  }

  drop(event: CdkDragDrop<any>) {
    if (!this.category) return;

    moveItemInArray(this.category.articles, event.previousIndex, event.currentIndex);

    this.categoryService.updateCategory(this.category).subscribe({
      next: () => {
        this.loadCategory();
      },
      error: (error: HttpErrorResponse) => {
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
        error: (error: HttpErrorResponse) => {
          this.loadCategory();
          this.snackbar.open('Une erreur est survenue lors de l\'ajout de l\'article à la catégorie', 'OK', {duration: 10000});
        },
      });
    });
  }

}
