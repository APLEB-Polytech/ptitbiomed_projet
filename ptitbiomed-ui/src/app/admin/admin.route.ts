import {Routes} from "@angular/router";
import {CategoryComponent} from "./category/category.component";
import {CategoryEditionComponent} from "./category/category-edition/category-edition.component";

export const AdminRoute: Routes = [
  {path: 'category-panel', component: CategoryComponent},
  {path: 'category-panel/:uuid', component: CategoryEditionComponent},
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
];
