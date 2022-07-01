import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {ListeUtilisateursComponent} from "./admin/utilisateurs/liste-utilisateurs/liste-utilisateurs.component";
import {AdminGuard} from "./shared/guard/admin.guard";
import {UploadMediaComponent} from "./media/upload-media/upload-media.component"; // CLI imports router

const routes: Routes = [
    {path: '', component: AccueilComponent},
    {path: 'login', component: LoginComponent},
    {path: 'medias', component: UploadMediaComponent, canActivate: [AdminGuard]},
    {
        path: 'admin/utilisateurs', component: ListeUtilisateursComponent, canActivate: [AdminGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
