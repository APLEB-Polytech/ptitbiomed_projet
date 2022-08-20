import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {ArticlesRoutingModule} from "./articles-routing.module";
import {ListeArticlesComponent} from './liste-articles/liste-articles.component';
import {ArticleEditorComponent} from './article-editor/article-editor.component';
import { ArticleRendererComponent } from './article-renderer/article-renderer.component';

@NgModule({
	declarations: [
		ListeArticlesComponent,
		ArticleEditorComponent,
  ArticleRendererComponent
	],
	imports: [
		CommonModule,
		ArticlesRoutingModule,
		MatInputModule,
		FormsModule,
		ReactiveFormsModule,
	]
})
export class ArticlesModule {
}
