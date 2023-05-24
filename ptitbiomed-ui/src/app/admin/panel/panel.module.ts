import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelComponent} from "./panel.component";
import {RouterModule} from "@angular/router";
import {panelRoute} from "./panel.route";
import {MatExpansionModule} from "@angular/material/expansion";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {AddChildMenuComponent} from './add-child-menu/add-child-menu.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatRadioModule} from "@angular/material/radio";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    PanelComponent,
    AddChildMenuComponent
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
        MatDialogModule,
        DragDropModule,
        MatRadioModule,
        MatAutocompleteModule,
        MatCheckboxModule
    ]
})
export class PanelModule {
}
