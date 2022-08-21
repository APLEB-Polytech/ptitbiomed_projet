import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {IArticle} from "../../shared/model/IArticle";
import {ArticleService} from "../article.service";
import {HttpResponse} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-liste-articles',
  templateUrl: './liste-articles.component.html',
  styleUrls: ['./liste-articles.component.css']
})
export class ListeArticlesComponent implements AfterViewInit {
  dataSource: MatTableDataSource<IArticle> = new MatTableDataSource<IArticle>();
  displayedColumns: string[] = ['title', 'author', 'creationTime', 'updateTime', 'outils'];


  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private articleService: ArticleService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadArticles()
  }

  loadArticles(): void {
    this.articleService.getAllArticles().subscribe({
      next: (response: HttpResponse<IArticle[]>) => {
        if (!response.ok || !response.body) {
          throw new Error('Erreur lors du chargement des articles')
        }
        this.dataSource.data = response.body
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
