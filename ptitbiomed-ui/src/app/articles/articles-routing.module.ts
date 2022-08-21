import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ArticleEditorComponent} from "./article-editor/article-editor.component";
import {ListeArticlesComponent} from "./liste-articles/liste-articles.component";
import {ConnectedGuard} from "../shared/guard/connected.guard";
import {ArticleViewerComponent} from "./article-viewer/article-viewer.component";

const routes: Routes = [
  {path: '', component: ListeArticlesComponent, canActivate: [ConnectedGuard]},
  {path: 'edit/:uuid', component: ArticleEditorComponent, canActivate: [ConnectedGuard]},
  {path: 'new', component: ArticleEditorComponent, canActivate: [ConnectedGuard]},
  {path: 'view/:uuid', component: ArticleViewerComponent},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ArticlesRoutingModule {
}
