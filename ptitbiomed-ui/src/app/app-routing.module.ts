import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HelloComponent} from "./hello/hello.component";
import {LoginComponent} from "./auth/login/login.component"; // CLI imports router

const routes: Routes = [
  {path: '', component: HelloComponent},
  {path: 'login', component: LoginComponent},
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
