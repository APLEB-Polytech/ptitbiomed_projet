import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelComponent} from "./panel.component";
import {RouterModule} from "@angular/router";
import {panelRoute} from "./panel.route";
import {PanelMenuComponent} from './panel-menu/panel-menu.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {PanelSubMenuComponent} from './panel-sub-menu/panel-sub-menu.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {ArticleListDialogComponent} from './article-list-dialog/article-list-dialog.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    PanelComponent,
    PanelMenuComponent,
    PanelSubMenuComponent,
    ArticleListDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(panelRoute),
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class PanelModule {
}
