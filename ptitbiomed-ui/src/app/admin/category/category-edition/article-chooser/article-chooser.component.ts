import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArticleService} from "../../../../articles/article.service";
import {IArticle} from "../../../../shared/model/IArticle";
import {BehaviorSubject} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-article-chooser',
  templateUrl: './article-chooser.component.html',
  styleUrls: ['./article-chooser.component.css']
})
export class ArticleChooserComponent implements OnInit {

  formChooseArticle: FormGroup = new FormGroup<{ articleId: FormControl<string> }>({
    articleId: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]})
  });
  private articleList: IArticle[] = []
  filteredArticleList: BehaviorSubject<IArticle[]> = new BehaviorSubject<IArticle[]>([]);

  constructor(
    private dialogRef: MatDialogRef<ArticleChooserComponent>,
    private articleService: ArticleService,
  ) {
  }

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe((res: HttpResponse<IArticle[]>) => {
      if (res.ok && res.body) this.articleList = res.body.sort((a, b) => a.title.localeCompare(b.title));
      this.filteredArticleList.next(this.getFilteredArticleList(''));
    });

    this.formChooseArticle.valueChanges.subscribe(value => this.filteredArticleList.next(this.getFilteredArticleList(value?.articleId || '')));
  }

  private getFilteredArticleList(filter: string): IArticle[] {
    filter = filter.toLowerCase();
    return this.articleList.filter(article =>
      article.title.toLowerCase().includes(filter) ||
      article.uuid?.includes(filter)
    );
  }

  validate() {
    this.dialogRef.close(this.formChooseArticle.controls['articleId']?.value)
  }

}
