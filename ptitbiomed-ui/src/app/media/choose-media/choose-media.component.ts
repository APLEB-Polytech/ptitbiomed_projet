import {Component, OnInit} from '@angular/core';
import {MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";
import {MediaService} from "../media.service";
import {IMedia} from "../../shared/model/IMedia";
import {Subject} from "rxjs";
import {MatLegacySnackBar as MatSnackBar} from "@angular/material/legacy-snack-bar";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-choose-media',
  templateUrl: './choose-media.component.html',
  styleUrls: ['./choose-media.component.css']
})
export class ChooseMediaComponent implements OnInit {

  images: Subject<IMedia[]> = new Subject<IMedia[]>()
  videos: Subject<IMedia[]> = new Subject<IMedia[]>()
  pdfs: Subject<IMedia[]> = new Subject<IMedia[]>()

  constructor(
    public dialogRef: MatDialogRef<ChooseMediaComponent>,
    public mediaService: MediaService,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.loadImages()
    this.loadVideos()
    this.loadPDF()
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

  loadVideos(): void {
    this.mediaService.getAllVideos().subscribe({
      next: (response: HttpResponse<IMedia[]>) => {
        if (!response.ok || !response.body) {
          this.snackbar.open('Erreur lors de la récupération des vidéos')
          throw new Error('Erreur lors de la récupération des vidéos')
        }
        this.videos.next(response.body)
      }
    })
  }

  loadPDF(): void {
    this.mediaService.getAllPDF().subscribe({
      next: (response: HttpResponse<IMedia[]>) => {
        if (!response.ok || !response.body) {
          this.snackbar.open('Erreur lors de la récupération des pdf')
          throw new Error('Erreur lors de la récupération des pdf')
        }
        this.pdfs.next(response.body)
      }
    })
  }

  valider(media: IMedia) {
    this.dialogRef.close(media)
  }
}
