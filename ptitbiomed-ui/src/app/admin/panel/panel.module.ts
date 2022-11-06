import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatRadioModule} from "@angular/material/radio";
import {PanelComponent} from "./panel.component";
import {RouterModule} from "@angular/router";
import {panelRoute} from "./panel.route";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {AddChildMenuComponent} from './add-child-menu/add-child-menu.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";


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
        MatAutocompleteModule
    ]
})
export class PanelModule {
}
