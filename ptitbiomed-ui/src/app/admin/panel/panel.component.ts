import {Component, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {HttpResponse} from "@angular/common/http";
import {IMenu, Menu} from "../../shared/model/IMenu";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {MenuGeneral} from "../../shared/model/menuGeneral.model";
import {AddChildMenuComponent} from "./add-child-menu/add-child-menu.component";
import {Submenua} from "../../shared/model/ISubmenua";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface NouveauMenu {
  label: string
}

export interface rankMenu {
  idMenu?: number;
  idSousMenu?: number;
  items: {
    id: number;
    rank: number;
  }[]
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  menus: MenuGeneral[] = [];
  menusBase: MenuGeneral[] = [];
  idMenu?: number
  idSousMenu?: number


  constructor(private menuService: MenuService, public dialog: MatDialog, private snackbar: MatSnackBar) {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.menus, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
    this.loadMenu()
  }

  loadSousMenu(menuChoisi: MenuGeneral): void {
    if (!this.idMenu) {
      this.idMenu = this.menus.filter(menu => menu.id === menuChoisi.id)[0].id
    } else if (!this.idSousMenu) {
      this.idSousMenu = this.menus.filter(menu => menu.id === menuChoisi.id)[0].id
    }
    this.menus = this.menus.filter(menu => menu.id === menuChoisi.id)[0].submenuas || this.menus.filter(menu => menuChoisi === menu)[0].submenuab || []
  }

  loadMenu(): void {
    this.menuService.getAllMenu().subscribe({
      next: (reponse: HttpResponse<IMenu[]>) => {
        if (!reponse.ok || !reponse.body) {
          throw new Error('Erreur lors du chargement')
        }
        this.menus = reponse.body
        this.menusBase = reponse.body
      }
    })
  }

  addChild(): void {
    const dialogRef = this.dialog.open(AddChildMenuComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result: NouveauMenu) => {
      if (this.idMenu) {
        const nouveauMenu = new Submenua(result.label, this.idMenu, 0)
        this.menuService.addSubmenua(nouveauMenu).subscribe({
          next: (res: HttpResponse<any>) => {
            if (res.ok) {
              this.menus.push(nouveauMenu)
            }
          }
        })
        return
      }
      const nouveauMenu = new Menu(result.label, 0)
      this.menuService.addMenu(nouveauMenu).subscribe({
        next: (res: HttpResponse<any>) => {
          if (res.ok) {
            this.menus.push(nouveauMenu)
          }
        }
      })

    });
  }

  save(): void {
    const modifyMenu: rankMenu = {
      idMenu: this.idMenu,
      idSousMenu: this.idSousMenu,
      items: []
    }
    for (let i = 0; i < this.menus.length; i++) {
      modifyMenu.items.push({
        id: this.menus[i].id || 0,
        rank: i
      })
    }
    this.menuService.updateRank(modifyMenu).subscribe({
        next: (res) => {
          if (res.ok) {
            this.snackbar.open('Mise a jour complete', 'OK', {duration: 2000})
            return
          }
          this.snackbar.open('Erreur', 'OK', {duration: 2000})
        },
        error: (error) => {
          this.snackbar.open('Erreur', 'OK', {duration: 2000})
        }
      }
    )
  }

  retour() {
    this.idMenu = undefined
    this.idSousMenu = undefined
    this.menus = this.menusBase
  }
}
