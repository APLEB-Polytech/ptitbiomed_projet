import {Component, Inject} from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef
} from "@angular/material/legacy-dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IMenu} from "../../../shared/model/IMenu";
import {BehaviorSubject} from "rxjs";
import {ArticleService} from "../../../articles/article.service";
import {HttpResponse} from "@angular/common/http";
import {IArticle} from "../../../shared/model/IArticle";
import {CategoryService} from "../../../services/category.service";
import {ICategory} from "../../../shared/model/ICategory";

@Component({
  selector: 'app-add-child-menu',
  templateUrl: './add-child-menu.component.html',
  styleUrls: ['./add-child-menu.component.css']
})
export class AddChildMenuComponent {

  formAddChild: FormGroup = new FormGroup<any>({
    label: new FormControl(this.menu?.label, [Validators.required, Validators.minLength(4)]),
    hidden: new FormControl(this.menu?.hidden),
    linkType: new FormControl(
      this.menu?.link ? 'link' :
        this.menu?.idArticle ? 'articleId' :
          this.menu?.idCategory ? 'categoryId' :
            undefined),
    link: new FormControl(this.menu?.link),
    articleId: new FormControl(this.menu?.idArticle),
    categoryId: new FormControl(this.menu?.idCategory),
  })

  private articleList: IArticle[] = [];
  filteredArticleList: BehaviorSubject<IArticle[]> = new BehaviorSubject<IArticle[]>([]);

  private categoryList: ICategory[] = [];
  filteredCategoryList: BehaviorSubject<ICategory[]> = new BehaviorSubject<ICategory[]>([]);

  constructor(
    public dialogRef: MatDialogRef<AddChildMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public menu: IMenu,
    private articleService: ArticleService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe((res: HttpResponse<IArticle[]>) => {
      if (res.ok && res.body) this.articleList = res.body.sort((a, b) => a.title.localeCompare(b.title));
      this.filteredArticleList.next(this.getFilteredArticleList(this.menu?.idArticle || ''))
    });

    this.categoryService.getAllCategories().subscribe((categories: ICategory[]) => {
      this.categoryList = categories.sort((a, b) => a.name.localeCompare(b.name));
      this.filteredCategoryList.next(this.getFilteredCategoryList(this.menu?.idCategory || ''))
    });

    this.formAddChild.valueChanges.subscribe(value => {
      this.filteredArticleList.next(this.getFilteredArticleList(value?.articleId || ''));
      this.filteredCategoryList.next(this.getFilteredCategoryList(value?.categoryId || ''));
    });
  }

  private getFilteredArticleList(filter: string): IArticle[] {
    filter = filter.toLowerCase();
    return this.articleList.filter(article =>
      article.title.toLowerCase().includes(filter) ||
      article.uuid?.includes(filter)
    );
  }

  private getFilteredCategoryList(filter: string): ICategory[] {
    filter = filter.toLowerCase();
    return this.categoryList.filter(category =>
      category.name.toLowerCase().includes(filter) ||
      category.uuid?.includes(filter)
    );
  }

  valid(): void {
    if (this.menu) {
      this.menu.label = this.formAddChild.controls['label']?.value;
    } else {
      this.menu = {
        label: this.formAddChild.controls['label']?.value,
        rank: -1,
        hidden: false,
      }
    }

    this.menu.hidden = this.formAddChild.controls['hidden']?.value;

    this.menu.idArticle = undefined;
    this.menu.idCategory = undefined;
    this.menu.link = undefined;

    let linkType = this.formAddChild.controls['linkType']?.value;
    if (linkType === 'link') {
      this.menu.link = this.formAddChild.controls['link']?.value;
    } else if (linkType === 'articleId') {
      this.menu.idArticle = this.formAddChild.controls['articleId']?.value;
    } else if (linkType === 'categoryId') {
      this.menu.idCategory = this.formAddChild.controls['categoryId']?.value;
    }

    this.dialogRef.close(this.menu);
  }

}
