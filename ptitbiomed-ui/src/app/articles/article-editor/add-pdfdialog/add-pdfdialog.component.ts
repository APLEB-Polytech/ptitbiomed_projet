import {Component, OnInit} from '@angular/core';
import {MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";
import {MediaService} from "../../../media/media.service";
import {MatLegacySnackBar as MatSnackBar} from "@angular/material/legacy-snack-bar";
import {Subject} from "rxjs";
import {IMedia} from "../../../shared/model/IMedia";
import {HttpResponse} from "@angular/common/http";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-add-pdfdialog',
  templateUrl: './add-pdfdialog.component.html',
  styleUrls: ['./add-pdfdialog.component.css']
})
export class AddPDFDialogComponent implements OnInit {

  pdfs: Subject<IMedia[]> = new Subject<IMedia[]>()
  nom = new FormControl<string>('');

  constructor(public dialogRef: MatDialogRef<AddPDFDialogComponent>, public mediaService: MediaService, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadPdfs()
  }

  loadPdfs(): void {
    this.mediaService.getAllPDF().subscribe({
      next: (response: HttpResponse<IMedia[]>) => {
        if (!response.ok || !response.body) {
          this.snackbar.open('Erreur lors de la récupération des PDF')
          throw new Error('Erreur lors de la récupération des PDF')
        }
        this.pdfs.next(response.body)
      }
    })
  }

  addPdf(event: IMedia) {
    this.dialogRef.close({pdf: event, nom: this.nom.value})
  }

}
