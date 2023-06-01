import {Component, EventEmitter, Output} from '@angular/core';
import {MediaService} from "../../services/media.service";
import {Clipboard} from '@angular/cdk/clipboard';
import {HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";
import {IMedia} from "../../shared/model/IMedia";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.css']
})
export class UploadMediaComponent {
  selectedFiles: FileList | undefined;
  currentFile: File | undefined | null;
  progress = 0;
  message = '';
  response: IMedia | undefined;

  @Output()
  nomMedia = new EventEmitter<IMedia>();

  constructor(
    private mediaService: MediaService,
    private clipboard: Clipboard,
    private _snackBar: MatSnackBar
  ) {
  }

  selectFile(event: Event) {
    if (event === null) throw new Error('No event');
    if (event.target === null) throw new Error('No event');
    const eventTarget = event.target as HTMLInputElement;
    if (eventTarget.files === null) throw new Error('No files');
    this.selectedFiles = eventTarget.files;
  }

  upload(): void {
    if (this.selectedFiles === undefined) throw new Error('No file selected');
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    if (this.currentFile === null) throw new Error('No current file selected');
    const currentFile: File = this.currentFile;
    this.mediaService.upload(currentFile).subscribe({
      next: (event: HttpEvent<IMedia>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total === undefined) throw new Error('No total');
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          if (event.body === undefined || event.body === null) throw new Error('No body');
          if (event.headers === undefined || event.headers === null) throw new Error('No Headers');
          const location = event.headers.get('Location') || '';
          this.clipboard.copy(location);
          this._snackBar.open('Adresse du fichier copiée dans le presse-papier', 'Fermer')
          this.response = event.body;
          this.nomMedia.emit(this.response);
        }
      },
      error: () => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      }
    })
    this.selectedFiles = undefined;
  }
}
