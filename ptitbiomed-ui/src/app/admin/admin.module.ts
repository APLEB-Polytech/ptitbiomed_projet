import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {AdminRoute} from "./admin.route";
import {CategoryPanelComponent} from './category/category-panel.component';
import {MatIconModule} from "@angular/material/icon";
import {CategoryCreationComponent} from './category/category-creation/category-creation.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CategoryEditionComponent} from './category/category-edition/category-edition.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ArticleChooserComponent} from './category/category-edition/article-chooser/article-chooser.component';
import {SummaryEditorComponent} from './category/category-edition/summary-editor/summary-editor.component';
import {TitleEditorComponent} from './category/category-edition/title-editor/title-editor.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";


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
