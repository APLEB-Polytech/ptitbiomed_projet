import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminGuard} from "../shared/guard/admin.guard";
import {ArticleEditorComponent} from "./article-editor/article-editor.component";
import {ListeArticlesComponent} from "./liste-articles/liste-articles.component";

const routes: Routes = [
	{path: '', component: ListeArticlesComponent, canActivate: [AdminGuard]},
	{path: 'new', component: ArticleEditorComponent, canActivate: [AdminGuard]},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ArticlesRoutingModule {
}
