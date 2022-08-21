import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadMediaComponent} from "./upload-media/upload-media.component";
import {ListeMediaComponent} from "./liste-media/liste-media.component";
import {ConnectedGuard} from "../shared/guard/connected.guard";


const routes: Routes = [
  {path: 'upload', component: UploadMediaComponent, canActivate: [ConnectedGuard]},
  {path: '', component: ListeMediaComponent, canActivate: [ConnectedGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule {
}
