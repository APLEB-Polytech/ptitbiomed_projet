import {Component, Inject, OnInit} from '@angular/core';
import {MenuService} from "../../../services/menu.service";
import {IMenu} from "../../../shared/model/IMenu";
import {HttpResponse} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-article-to-media-dialog',
  templateUrl: './add-article-to-media-dialog.component.html',
  styleUrls: ['./add-article-to-media-dialog.component.css']
})
export class AddArticleToMediaDialogComponent implements OnInit {
  menus: IMenu[] = []

  constructor(private menuService: MenuService, public dialogRef: MatDialogRef<AddArticleToMediaDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { idArticle: string },) {
  }

  ngOnInit(): void {
    this.loadMenu()
  }

  loadMenu(): void {
    this.menuService.getAllMenu().subscribe(
      (response: HttpResponse<IMenu[]>) => {
        if (!response.ok || !response.body) {
          return;
        }
        this.menus = response.body
      }
    )
  }

  ajouter(idMenu: number | null = null, idSousMenu: number | null = null): void {
    this.dialogRef.close({
      idMenu: idMenu,
      idSousMenu: idSousMenu
    })
  }
}
