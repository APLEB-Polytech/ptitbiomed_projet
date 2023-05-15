import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatLegacyRadioModule as MatRadioModule} from "@angular/material/legacy-radio";
import {PanelComponent} from "./panel.component";
import {RouterModule} from "@angular/router";
import {panelRoute} from "./panel.route";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatSortModule} from "@angular/material/sort";
import {MatLegacyMenuModule as MatMenuModule} from "@angular/material/legacy-menu";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {AddChildMenuComponent} from './add-child-menu/add-child-menu.component';
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from "@angular/material/legacy-autocomplete";
import {MatLegacyCheckboxModule as MatCheckboxModule} from "@angular/material/legacy-checkbox";


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
