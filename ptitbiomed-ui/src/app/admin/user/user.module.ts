import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListeUsersComponent} from './liste-users/liste-users.component';
import {MatSortModule} from "@angular/material/sort";
import {RouterModule} from "@angular/router";
import {userRoute} from "./user.route";
import {MatIconModule} from "@angular/material/icon";
import {AddUserComponent} from './add-user/add-user.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";


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
