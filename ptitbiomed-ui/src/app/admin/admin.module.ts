import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {AdminRoute} from "./admin.route";
import {CategoryPanelComponent} from './category/category-panel.component';
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {CategoryCreationComponent} from './category/category-creation/category-creation.component';
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {ReactiveFormsModule} from "@angular/forms";
import {CategoryEditionComponent} from './category/category-edition/category-edition.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ArticleChooserComponent} from './category/category-edition/article-chooser/article-chooser.component';
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from "@angular/material/legacy-autocomplete";
import {SummaryEditorComponent} from './category/category-edition/summary-editor/summary-editor.component';
import {TitleEditorComponent} from './category/category-edition/title-editor/title-editor.component';


@NgModule({
  declarations: [
    CategoryPanelComponent,
    CategoryCreationComponent,
    CategoryEditionComponent,
    ArticleChooserComponent,
    SummaryEditorComponent,
    TitleEditorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoute),
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    DragDropModule,
    MatAutocompleteModule
  ]
})
export class AdminModule {
}
