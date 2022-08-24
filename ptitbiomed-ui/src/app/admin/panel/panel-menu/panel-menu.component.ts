import {Component, Input, OnInit} from '@angular/core';
import {IMenu} from "../../../shared/model/IMenu";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ISubmenua, Submenua} from "../../../shared/model/ISubmenua";
import {MenuService} from "../../../services/menu.service";
import {Router} from "@angular/router";

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
    name: new FormControl<string>('', [Validators.required])
  })

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
  }

  createSubmenu() {
    const submenu: ISubmenua = new Submenua(
      this.formMenuAdd.controls['name'].value,
      this.menu?.id ?? -1
    );
    console.log(submenu);
    this.menuService.addSubmenua(submenu).subscribe({
      next: (response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          alert('KO');
        }
      }
    });
  }
}
