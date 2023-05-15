import {Component, OnInit} from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {IMedia} from "../../../shared/model/IMedia";
import {MediaService} from "../../../media/media.service";
import {MatLegacySnackBar as MatSnackBar} from "@angular/material/legacy-snack-bar";
import {Subject} from "rxjs";
import {MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-add-image-dialog',
  templateUrl: './add-image-dialog.component.html',
  styleUrls: ['./add-image-dialog.component.css']
})
export class AddImageDialogComponent implements OnInit {

  images: Subject<IMedia[]> = new Subject<IMedia[]>()
  taille = new FormControl<string>('grand');
  legende = new FormControl<string>('');
  lien = new FormControl<string>('');

  constructor(public mediaService: MediaService, private snackbar: MatSnackBar, public dialogRef: MatDialogRef<AddImageDialogComponent>) {
  }

  ngOnInit(): void {
    this.loadImages()
  }

  loadImages(): void {
    this.mediaService.getAllImages().subscribe({
      next: (response: HttpResponse<IMedia[]>) => {
        if (!response.ok || !response.body) {
          this.snackbar.open('Erreur lors de la récupération des images')
          throw new Error('Erreur lors de la récupération des images')
        }
        this.images.next(response.body)
      }
    })
  }

  addImage(event: IMedia) {
    this.dialogRef.close({image: event, taille: this.taille.value, legende: this.legende.value, lien: this.lien.value})
  }
}
