import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {LogoutComponent} from "./auth/logout/logout.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {ConnectedGuard} from "./shared/guard/connected.guard";
import {CategoryViewerComponent} from "./category-viewer/category-viewer.component";

const routes: Routes = [
  {path: '', component: AccueilComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'article', loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule)},
  {path: 'medias', loadChildren: () => import('./media/media.module').then(m => m.MediaModule)},
  {path: 'admin/panel', loadChildren: () => import('./admin/panel/panel.module').then(m => m.PanelModule)},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [ConnectedGuard]
  },
  {path: 'accueil', redirectTo: ''},
  {path: 'category/view', redirectTo: ''},
  {path: 'category/view/:uuid', component: CategoryViewerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
