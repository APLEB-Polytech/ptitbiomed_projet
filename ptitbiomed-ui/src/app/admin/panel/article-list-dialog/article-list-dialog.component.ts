import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ArticleService} from "../../../articles/article.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {IArticle} from "../../../shared/model/IArticle";
import {HttpResponse} from "@angular/common/http";

export interface articleListDialogDate {
  idMenu: number,
  typeMenu: 'menu' | 'submenua' | 'submenub'
}

@Component({
  selector: 'app-article-list-dialog',
  templateUrl: './article-list-dialog.component.html',
  styleUrls: ['./article-list-dialog.component.css']
})
export class ArticleListDialogComponent implements AfterViewInit {

  dataSource: MatTableDataSource<IArticle> = new MatTableDataSource<IArticle>();
  displayedColumns: string[] = ['title', 'author', 'creationTime', 'updateTime', 'outils'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<ArticleListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: articleListDialogDate,
    private articleService: ArticleService
  ) {
  }

  ngAfterViewInit() {
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
