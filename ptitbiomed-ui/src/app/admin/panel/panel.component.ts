import {Component, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {IMenu} from "../../shared/model/IMenu";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {AddChildMenuComponent} from "./add-child-menu/add-child-menu.component";
import {MatDialog} from "@angular/material/dialog";
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
    this.menuService.sortMenusForParent({
      idParent: this.idMenu, sortedChildrenIds: this.filteredMenus.map(menu => {
        if (!menu.id) throw new Error("Menu has no ID");
        return menu.id
      })
    }).subscribe({
      next: (res: HttpResponse<void>) => {
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
    this.menuService.refreshNavbar.emit();
    this.menuService.getAllMenuWithHidden().subscribe({
      next: (menus: IMenu[]) => {
        this.idMenu = idMenu;
        this.menus = menus;
        this.filteredMenus = this.idMenu
          ? this.menus.filter(menu => menu.idParent === this.idMenu)
          : this.menus.filter(menu => menu.idParent === null);
      },
      error: (e: HttpErrorResponse) => {
        this.snackbar.open("Erreur lors du chargement : " + e.message);
      },
    });
  }

  createMenu(): void {
    const dialogRef = this.dialog.open(AddChildMenuComponent);
    dialogRef.afterClosed().subscribe((newMenu: IMenu) => {
      if (!newMenu) return;
      if (this.idMenu) newMenu.idParent = this.idMenu;
      this.menuService.createMenu(newMenu).subscribe({
        next: (res: HttpResponse<void>) => {
          if (res.ok) {
            this.loadMenu(this.idMenu);
            this.snackbar.open('Onglet créé', 'OK', {duration: 2000});
          }
        },
        error: () => {
          this.snackbar.open("Erreur lors de la création de l'onglet", 'OK', {duration: 10000});
        },
      })
    });
  }

  editMenu(menu: IMenu) {
    const dialogRef = this.dialog.open(AddChildMenuComponent, {data: menu});
    dialogRef.afterClosed().subscribe((editedMenu: IMenu) => {
      if (!editedMenu) return;

      this.menuService.editMenu(editedMenu).subscribe({
        next: (res: HttpResponse<void>) => {
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
    if (!menu.id) throw new Error("Menu has no ID");
    this.menuService.deleteMenu(menu.id).subscribe({
      next: (res: HttpResponse<void>) => {
        if (res.ok) {
          this.snackbar.open('Onglet supprimé', 'OK', {duration: 2000});
          this.loadMenu(this.idMenu);
        } else {
          this.snackbar.open("Erreur lors de la suppression de l'onglet", 'OK', {duration: 2000});
        }
      }
    });
  }

  retour() {
    if (!this.idMenu) return;
    this.loadMenu(this.getMenuById(this.idMenu).idParent);
  }

  getMenuById(id: number): IMenu {
    return this.menus.filter(menu => menu.id === id)[0];
  }

  getPath() {
    let path = '';
    let idMenu = this.idMenu;

    while (idMenu) {
      const menu = this.getMenuById(idMenu);
      path = ' > ' + menu.label + path;
      idMenu = menu.idParent;
    }

    return path;
  }

}
