import {Component, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {HttpResponse} from "@angular/common/http";
import {IMenu} from "../../shared/model/IMenu";
import {Subject} from "rxjs";


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  menus: Subject<IMenu[]> = new Subject<IMenu[]>();


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

}
