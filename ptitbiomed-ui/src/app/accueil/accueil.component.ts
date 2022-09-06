import {Component, OnInit} from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {IArticle} from "../shared/model/IArticle";
import {ArticleService} from "../articles/article.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  content?: string

  constructor(private articleService: ArticleService,) {
  }

  ngOnInit(): void {
    this.loadArticle()
  }

  loadArticle(): void {
    this.articleService.getAccueil().subscribe({
      next: (response: HttpResponse<IArticle>) => {
        if (!response.ok || !response.body) {
          throw new Error('Erreur lors du chargement de l\'article')
        }
        this.content = response.body.html || ''
      }
    })
  }

}
