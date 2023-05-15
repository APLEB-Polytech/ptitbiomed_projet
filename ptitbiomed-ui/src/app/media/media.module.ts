import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadMediaComponent} from "./upload-media/upload-media.component";
import {MediaRoutingModule} from "./media-routing.module";
import {MatLegacyProgressBarModule as MatProgressBarModule} from "@angular/material/legacy-progress-bar";
import {ListeMediaComponent} from './liste-media/liste-media.component';
import {MatLegacyTabsModule as MatTabsModule} from "@angular/material/legacy-tabs";
import {MediaDetailsComponent} from './media-details/media-details.component';
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import {ChooseMediaComponent} from "./choose-media/choose-media.component";
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";


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
