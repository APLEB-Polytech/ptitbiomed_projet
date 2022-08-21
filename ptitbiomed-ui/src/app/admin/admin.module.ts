import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {AdminRoute} from "./admin.route";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoute)
  ]
})
export class AdminModule {
}
