import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CategoryService} from "../services/category.service";
import {ICategory} from "../shared/model/ICategory";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IArticle} from "../shared/model/IArticle";
import {ArticleService} from "../articles/article.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-category-viewer',
  templateUrl: './category-viewer.component.html',
  styleUrls: ['./category-viewer.component.css']
})
export class CategoryViewerComponent implements OnInit {

  private static readonly SUMMARY_MAX_LENGTH = 500;

  categoryUuid = '';
  category: ICategory | undefined;

  articles: Map<string, IArticle> = new Map<string, IArticle>();
  images: Map<string, string> = new Map<string, string>();

  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    public userService: UserService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.categoryUuid = params.get('uuid') || '';
      this.loadCategory();
    });
  }

  private loadCategory(): void {
    if (!this.categoryUuid) throw "Invalid category UUID";

    this.categoryService.getCategory(this.categoryUuid).subscribe({
      next: (category: ICategory) => {
        this.category = category;
        this.loadArticles();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 404) {
          // TODO: redirect to 404
          this.snackbar.open('Catégorie introuvable', 'OK', {duration: 10000});
        } else {
          this.snackbar.open('Une erreur est survenue', 'OK', {duration: 10000});
        }
      },
    });
  }

  private loadArticles(): void {
    if (!this.category) return;

    this.articles.clear();
    this.images.clear();

    for (const articleUuid of this.category.articles) {
      this.articleService.getArticleByUUID(articleUuid).subscribe({
        next: (response: HttpResponse<IArticle>) => {
          if (response.ok && response.body) {
            const article = response.body;

            if (article.html) {
              const imgMatch = article.html.match(/<img[^>]*src="([^"]*)"/);
              if (imgMatch) this.images.set(articleUuid, imgMatch[1]);

              article.html = article.html
                .replace(/<[^>]*>/g, '')
                .substring(0, CategoryViewerComponent.SUMMARY_MAX_LENGTH);

              if (article.html.length === CategoryViewerComponent.SUMMARY_MAX_LENGTH) {
                article.html += '...';
              }
            }

            this.articles.set(articleUuid, article);
          }
        }
      });
    }
  }

}
