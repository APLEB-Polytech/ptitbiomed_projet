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


@NgModule({
  declarations: [
    PanelComponent,
    PanelMenuComponent,
    PanelSubMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(panelRoute),
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class PanelModule {
}
