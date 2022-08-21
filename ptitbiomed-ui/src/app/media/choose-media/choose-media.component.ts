import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MediaService} from "../media.service";
import {IMedia} from "../../shared/model/IMedia";
import {Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-choose-media',
  templateUrl: './choose-media.component.html',
  styleUrls: ['./choose-media.component.css']
})
export class ChooseMediaComponent implements OnInit {

  images: Subject<IMedia[]> = new Subject<IMedia[]>()
  videos: Subject<IMedia[]> = new Subject<IMedia[]>()

  constructor(
    public dialogRef: MatDialogRef<ChooseMediaComponent>,
    public mediaService: MediaService,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.loadImages()
    this.loadVideos()
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

  valider(media: IMedia) {
    this.dialogRef.close(media)
  }
}
