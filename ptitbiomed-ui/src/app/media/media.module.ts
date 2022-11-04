import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadMediaComponent} from "./upload-media/upload-media.component";
import {MediaRoutingModule} from "./media-routing.module";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ListeMediaComponent} from './liste-media/liste-media.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MediaDetailsComponent} from './media-details/media-details.component';
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ChooseMediaComponent} from "./choose-media/choose-media.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    UploadMediaComponent,
    ListeMediaComponent,
    MediaDetailsComponent,
    ChooseMediaComponent
  ],
  exports: [
    MediaDetailsComponent,
    UploadMediaComponent
  ],
  imports: [
    CommonModule,
    MediaRoutingModule,
    MatProgressBarModule,
    MatTabsModule,
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class MediaModule {
}
