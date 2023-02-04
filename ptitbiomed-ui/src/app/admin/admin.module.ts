import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {AdminRoute} from "./admin.route";
import {CategoryPanelComponent} from './category/category-panel.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { CategoryCreationComponent } from './category/category-creation/category-creation.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { CategoryEditionComponent } from './category/category-edition/category-edition.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ArticleChooserComponent } from './category/category-edition/article-chooser/article-chooser.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {SummaryEditorComponent} from './category/category-edition/summary-editor/summary-editor.component';


@NgModule({
  declarations: [
    CategoryPanelComponent,
    CategoryCreationComponent,
    CategoryEditionComponent,
    ArticleChooserComponent,
    SummaryEditorComponent,
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
