import {Component, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {HttpResponse} from "@angular/common/http";
import {IMenu, Menu} from "../../shared/model/IMenu";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {AddChildMenuComponent} from "./add-child-menu/add-child-menu.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  menus: IMenu[] = [];
  filteredMenus: IMenu[] = [];
  idMenu?: number;

  constructor(private menuService: MenuService, public dialog: MatDialog, private snackbar: MatSnackBar) {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.filteredMenus, event.previousIndex, event.currentIndex);
    this.menuService.sortMenusForParent({idParent: this.idMenu, sortedChildrenIds: this.filteredMenus.map(menu => menu.id!)}).subscribe({
      next: (res: HttpResponse<any>) => {
        if (!res.ok) {
          this.snackbar.open("Erreur lors de la sauvegardes de l'ordre des onglets", 'OK', {duration: 2000});
        }
        this.loadMenu(this.idMenu);
      }
    });
  }

  ngOnInit(): void {
    this.loadMenu()
  }

  loadMenu(idMenu?: number): void {
    this.menuService.getAllMenu().subscribe({
      next: (res: HttpResponse<IMenu[]>) => {
        if (!res.ok || !res.body) {
          throw new Error('Erreur lors du chargement')
        }
        this.idMenu = idMenu;
        this.menus = res.body;
        this.filteredMenus = this.idMenu
          ? this.menus.filter(menu => menu.idParent === this.idMenu)
          : this.menus.filter(menu => menu.idParent === null);
      }
    })
  }

  createMenu(): void {
    const dialogRef = this.dialog.open(AddChildMenuComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe((newMenu: IMenu) => {
      if (!newMenu) return;
      if (this.idMenu) newMenu.idParent = this.idMenu;
      this.menuService.createMenu(newMenu).subscribe({
        next: (res: HttpResponse<any>) => {
          if (res.ok) {
            this.loadMenu(this.idMenu);
            this.snackbar.open('Onglet créé', 'OK', {duration: 2000});
          }
        }
      })
    });
  }

  editMenu(menu: IMenu) {
    const dialogRef = this.dialog.open(AddChildMenuComponent, {data: menu, width: '250px'});
    dialogRef.afterClosed().subscribe((editedMenu: IMenu) => {
      if (!editedMenu) return;

      this.menuService.editMenu(editedMenu).subscribe({
        next: (res: HttpResponse<any>) => {
          if (res.ok) {
            this.loadMenu(this.idMenu);
            this.snackbar.open('Onglet modifié', 'OK', {duration: 2000});
          } else {
            this.snackbar.open("Erreur lors de la modification de l'onglet", 'OK', {duration: 2000});
          }
        }
      });
    });
  }

  deleteMenu(menu: IMenu) {
    if (!confirm("Confirmer la suppression de l'onglet '" + menu.label + "' ?")) return;
    this.menuService.deleteMenu(menu.id!).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok) {
          this.snackbar.open('Onglet supprimé', 'OK', {duration: 2000});
          this.loadMenu(this.idMenu);
        } else {
          this.snackbar.open("Erreur lors de la suppression de l'onglet", 'OK', {duration: 2000});
        }
      }
    });
  }

  /*
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
  */

  retour() {
    this.loadMenu(this.getMenuById(this.idMenu!).idParent);
  }

  getMenuById(id: number): IMenu {
    return this.menus.filter(menu => menu.id === id)[0];
  }

  getPath() {
    let path = '';
    let idMenu = this.idMenu;

    while (idMenu) {
      let menu = this.getMenuById(idMenu);
      path = ' > ' + menu.label + path;
      idMenu = menu.idParent!;
    }

    return path;
  }

}
