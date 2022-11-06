import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IMenu} from "../../../shared/model/IMenu";
import {BehaviorSubject, map, Observable, startWith, Subject} from "rxjs";
import {ArticleService} from "../../../articles/article.service";
import {HttpResponse} from "@angular/common/http";
import {IArticle} from "../../../shared/model/IArticle";

@Component({
  selector: 'app-add-child-menu',
  templateUrl: './add-child-menu.component.html',
  styleUrls: ['./add-child-menu.component.css']
})
export class AddChildMenuComponent {

  formAddChild: FormGroup = new FormGroup<any>({
    label: new FormControl(this.menu?.label, [Validators.required, Validators.minLength(4)]),
    linkType: new FormControl(this.menu?.link ? 'link' : this.menu?.idArticle ? 'articleId' : undefined),
    link: new FormControl(this.menu?.link),
    articleId: new FormControl(this.menu?.idArticle),
  })
  private articleList: IArticle[] = [];
  filteredArticleList: BehaviorSubject<IArticle[]> = new BehaviorSubject<IArticle[]>([]);

  constructor(public dialogRef: MatDialogRef<AddChildMenuComponent>,
              @Inject(MAT_DIALOG_DATA) public menu: IMenu,
              private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe((res: HttpResponse<IArticle[]>) => {
      if (res.ok && res.body) this.articleList = res.body.sort((a, b) => a.title.localeCompare(b.title));
      this.filteredArticleList.next(this.getFilteredArticleList(this.menu?.idArticle || ''))
    });

    this.formAddChild.valueChanges.subscribe(value => this.filteredArticleList.next(this.getFilteredArticleList(value?.articleId || '')));
  }

  private getFilteredArticleList(filter: string): IArticle[] {
    filter = filter.toLowerCase();
    return this.articleList.filter(article =>
      article.title.toLowerCase().includes(filter) ||
      article.uuid?.includes(filter)
    );
  }

  valid(): void {
    if (this.menu) {
      this.menu.label = this.formAddChild.controls['label']?.value;
    } else {
      this.menu = {
        label: this.formAddChild.controls['label']?.value,
        rank: -1
      }
    }

    this.menu.idArticle = undefined;
    this.menu.link = undefined;

    let linkType = this.formAddChild.controls['linkType']?.value;
    if (linkType === 'link') {
      this.menu.link = this.formAddChild.controls['link']?.value;
    } else if (linkType === 'articleId') {
      this.menu.idArticle = this.formAddChild.controls['articleId']?.value;
    }

    this.dialogRef.close(this.menu);
  }

}
