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
import {MatSidenavModule} from "@angular/material/sidenav";
import {AddTitleDialogComponent} from './article-editor/add-title-dialog/add-title-dialog.component';
import {MatRadioModule} from "@angular/material/radio";
import {AddParagrapheDialogComponent} from './article-editor/add-paragraphe-dialog/add-paragraphe-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AddImageDialogComponent} from './article-editor/add-image-dialog/add-image-dialog.component';
import {MediaModule} from "../media/media.module";
import {AddVideoDialogComponent} from './article-editor/add-video-dialog/add-video-dialog.component';
import {AddLienDialogComponent} from './article-editor/add-lien-dialog/add-lien-dialog.component';
import {AddPDFDialogComponent} from './article-editor/add-pdfdialog/add-pdfdialog.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    ListeArticlesComponent,
    ArticleEditorComponent,
    ArticleRendererComponent,
    ArticleViewerComponent,
    AddTitleDialogComponent,
    AddParagrapheDialogComponent,
    AddImageDialogComponent,
    AddVideoDialogComponent,
    AddLienDialogComponent,
    AddPDFDialogComponent
  ],
  exports: [
    ArticleRendererComponent
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
    MatMenuModule,
    MatSidenavModule,
    MatRadioModule,
    MatCheckboxModule,
    MediaModule,
    MatProgressBarModule
  ]
})
export class ArticlesModule {
}
