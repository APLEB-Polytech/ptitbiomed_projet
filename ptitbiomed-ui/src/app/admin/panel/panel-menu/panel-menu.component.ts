import {Component, Input, OnInit} from '@angular/core';
import {IMenu} from "../../../shared/model/IMenu";

@Component({
  selector: 'app-panel-menu',
  templateUrl: './panel-menu.component.html',
  styleUrls: ['./panel-menu.component.css']
})
export class PanelMenuComponent implements OnInit {

  @Input()
  menu?: IMenu

  constructor() {
  }

  ngOnInit(): void {
  }

}
