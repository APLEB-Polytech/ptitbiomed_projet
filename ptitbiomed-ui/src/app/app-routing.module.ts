import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {ListeUtilisateursComponent} from "./admin/utilisateurs/liste-utilisateurs/liste-utilisateurs.component";
import {AdminGuard} from "./shared/guard/admin.guard";

const routes: Routes = [
  {path: '', component: AccueilComponent},
  {path: 'login', component: LoginComponent},
  {path: 'medias', loadChildren: () => import('./media/media.module').then(m => m.MediaModule)},
  {
    path: 'admin/utilisateurs', component: ListeUtilisateursComponent, canActivate: [AdminGuard]
  },
  {path: 'admin/panel', loadChildren: () => import('./admin/panel/panel.module').then(m => m.PanelModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
