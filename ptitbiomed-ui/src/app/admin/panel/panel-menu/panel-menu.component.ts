import {Component, Input, OnInit} from '@angular/core';
import {IMenu} from "../../../shared/model/IMenu";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-panel-menu',
  templateUrl: './panel-menu.component.html',
  styleUrls: ['./panel-menu.component.css']
})
export class PanelMenuComponent implements OnInit {

  @Input()
  menu?: IMenu
  afficherForm: boolean = false;

  formMenuAdd: FormGroup = new FormGroup<any>({
    name: new FormControl<string>('', [Validators.required]),
  })

  constructor() {
  }

  ngOnInit(): void {
  }

}
