import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListeUsersComponent} from './liste-users/liste-users.component';
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatSortModule} from "@angular/material/sort";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import {RouterModule} from "@angular/router";
import {userRoute} from "./user.route";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatIconModule} from "@angular/material/icon";
import {AddUserComponent} from './add-user/add-user.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatLegacyMenuModule as MatMenuModule} from "@angular/material/legacy-menu";


@NgModule({
  declarations: [
    ListeUsersComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule.forChild(userRoute),
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatMenuModule
  ]
})
export class UserModule {
}
