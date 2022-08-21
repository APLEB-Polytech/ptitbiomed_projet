import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {ArticlesRoutingModule} from "./articles-routing.module";
import {ListeArticlesComponent} from './liste-articles/liste-articles.component';
import {ArticleEditorComponent} from './article-editor/article-editor.component';
import {ArticleRendererComponent} from './article-renderer/article-renderer.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {ArticleViewerComponent} from './article-viewer/article-viewer.component';

@NgModule({
  declarations: [
    ListeArticlesComponent,
    ArticleEditorComponent,
    ArticleRendererComponent,
    ArticleViewerComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class ArticlesModule {
}
