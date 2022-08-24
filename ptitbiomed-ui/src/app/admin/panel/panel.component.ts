import {Component, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {HttpResponse} from "@angular/common/http";
import {IMenu, Menu} from "../../shared/model/IMenu";
import {Subject} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  menus: Subject<IMenu[]> = new Subject<IMenu[]>();
  afficherForm: boolean = false

  formMenuAdd: FormGroup = new FormGroup<any>({
    name: new FormControl<string>('', [Validators.required]),
    rank: new FormControl<number>(0, [Validators.required, Validators.min(0)])
  })


  constructor(private menuService: MenuService) {
  }


  ngOnInit(): void {
    this.loadMenu()
  }

  loadMenu(): void {
    this.menuService.getAllMenu().subscribe({
      next: (reponse: HttpResponse<IMenu[]>) => {
        if (!reponse.ok || !reponse.body) {
          throw new Error('Erreur lors du chargement')
        }
        this.menus.next(reponse.body)
      }
    })
  }

  createMenu() {
    const menu: IMenu = new Menu(
      this.formMenuAdd.controls['name'].value,
      this.formMenuAdd.controls['rank'].value
    );
    this.menuService.addMenu(menu).subscribe({
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
