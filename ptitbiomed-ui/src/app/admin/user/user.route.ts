import {Routes} from "@angular/router";
import {ListeUsersComponent} from "./liste-users/liste-users.component";
import {AddUserComponent} from "./add-user/add-user.component";

export const userRoute: Routes = [
  {path: '', component: ListeUsersComponent},
  {path: 'add', component: AddUserComponent}
];
