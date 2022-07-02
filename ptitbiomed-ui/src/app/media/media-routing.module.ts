import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadMediaComponent} from "./upload-media/upload-media.component";
import {AdminGuard} from "../shared/guard/admin.guard";
import {ListeMediaComponent} from "./liste-media/liste-media.component";


const routes: Routes = [
  {path: 'upload', component: UploadMediaComponent, canActivate: [AdminGuard]},
  {path: '', component: ListeMediaComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule {
}
