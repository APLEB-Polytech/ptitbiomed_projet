import {Component, Input, OnInit} from '@angular/core';
import {IMedia} from "../../shared/model/IMedia";
import {MediaService} from "../media.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.css']
})
export class MediaDetailsComponent implements OnInit {

  @Input()
  media: IMedia | undefined;

  constructor(private mediaService: MediaService) {
  }

  ngOnInit(): void {
  }

  isImage(): boolean {
    if (this.media === undefined) return false;
    return this.media.type.startsWith('image');
  }

  isVideo(): boolean {
    if (this.media === undefined) return false;
    return this.media.type.startsWith('video');
  }

  supprimer() {
    if (!this.media) {
      return;
    }
    if (!window.confirm("Voulez-vous vraiment supprimer ?")) {
      return;
    }
    this.mediaService.deleteMedia(this.media.hash).subscribe({
      next: (response: HttpResponse<any>) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression')
        }
        location.reload()
      }
    })
  }
}
