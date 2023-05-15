import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {IMedia} from "../../../shared/model/IMedia";
import {FormControl} from "@angular/forms";
import {MediaService} from "../../../media/media.service";
import {MatLegacySnackBar as MatSnackBar} from "@angular/material/legacy-snack-bar";
import {MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-video-dialog',
  templateUrl: './add-video-dialog.component.html',
  styleUrls: ['./add-video-dialog.component.css']
})
export class AddVideoDialogComponent implements OnInit {

  videos: Subject<IMedia[]> = new Subject<IMedia[]>()
  taille = new FormControl<string>('petit');
  legende = new FormControl<string>('');

  constructor(public mediaService: MediaService, private snackbar: MatSnackBar, public dialogRef: MatDialogRef<AddVideoDialogComponent>) {
  }

  ngOnInit(): void {
    this.loadVideos()
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

  addVideo(event: IMedia) {
    this.dialogRef.close({video: event, taille: this.taille.value, legende: this.legende.value})
  }

}
