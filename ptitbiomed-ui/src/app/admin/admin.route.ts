import {Routes} from "@angular/router";
import {CategoryPanelComponent} from "./category/category-panel.component";
import {CategoryEditionComponent} from "./category/category-edition/category-edition.component";

export const AdminRoute: Routes = [
  {path: 'category-panel', component: CategoryPanelComponent},
  {path: 'category-panel/:uuid', component: CategoryEditionComponent},
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
];
