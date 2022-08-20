import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {ListeUtilisateursComponent} from "./admin/utilisateurs/liste-utilisateurs/liste-utilisateurs.component";
import {AdminGuard} from "./shared/guard/admin.guard";
import {PanelComponent} from "./admin/panel/panel.component"; // CLI imports router

const routes: Routes = [
  {path: 'accueil', component: AccueilComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'admin/utilisateurs', component: ListeUtilisateursComponent, canActivate: [AdminGuard]
  },
  {path: 'admin/panel', component: PanelComponent}
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
