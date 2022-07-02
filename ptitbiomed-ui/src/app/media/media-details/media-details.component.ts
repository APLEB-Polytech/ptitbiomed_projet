import {Component, Input, OnInit} from '@angular/core';
import {IMedia} from "../../shared/model/IMedia";

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.css']
})
export class MediaDetailsComponent implements OnInit {

  @Input()
  media: IMedia | undefined;

  constructor() {
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

}
