import {Component, Input, OnInit} from '@angular/core';
import {ISubmenua} from "../../../shared/model/ISubmenua";

@Component({
  selector: 'app-panel-sub-menu',
  templateUrl: './panel-sub-menu.component.html',
  styleUrls: ['./panel-sub-menu.component.css']
})
export class PanelSubMenuComponent implements OnInit {
  @Input()
  menu?: ISubmenua

  constructor() {
  }

  ngOnInit(): void {
  }

}
