import {PanelComponent} from "./panel.component";
import {Routes} from "@angular/router";
import {ConnectedGuard} from "../../shared/guard/connected.guard";

export const panelRoute: Routes = [
  {path: '', component: PanelComponent, canActivate: [ConnectedGuard]}
];
