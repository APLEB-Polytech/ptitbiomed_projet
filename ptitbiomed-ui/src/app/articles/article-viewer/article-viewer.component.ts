import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {IArticle} from "../../shared/model/IArticle";
import {HttpResponse} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-article-viewer',
  templateUrl: './article-viewer.component.html',
  styleUrls: ['./article-viewer.component.css']
})
export class ArticleViewerComponent implements OnInit {

  article: Subject<IArticle> = new Subject<IArticle>();
  content: string = ''

  constructor(private articleService: ArticleService, private route: ActivatedRoute, public userService: UserService, private router: Router,
              private titleService: Title
  ) {
    if (this.route.snapshot.params['uuid']) {
      this.loadArticle(this.route.snapshot.params['uuid'])
    }
  }

  ngOnInit(): void {
  }

  loadArticle(uuid: string): void {
    this.articleService.getArticleByUUID(uuid).subscribe({
      next: (response: HttpResponse<IArticle>) => {
        if (!response.ok || !response.body) {
          throw new Error('Erreur lors du chargement de l\'article')
        }
        this.article.next(response.body)
        this.titleService.setTitle(`Le Ptit Biomed - ${response.body.title}`)
        this.content = response.body.html || ''
      }
    })
  }

  modifierArticle(): void {
    const uuid: string = this.route.snapshot.params['uuid']
    this.router.navigate(['/article/edit/' + uuid])
  }
}
