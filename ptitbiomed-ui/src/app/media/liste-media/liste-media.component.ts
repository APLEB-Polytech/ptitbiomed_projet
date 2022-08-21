import {Component, OnInit} from '@angular/core';
import {IMedia} from "../../shared/model/IMedia";
import {MediaService} from "../media.service";
import {HttpResponse} from "@angular/common/http";
import {IPaginator} from "../../shared/model/Paginator";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-liste-media',
  templateUrl: './liste-media.component.html',
  styleUrls: ['./liste-media.component.css']
})
export class ListeMediaComponent implements OnInit {

  images: IPaginator<IMedia> = {
    data: [],
    pageSize: 10,
    itemMax: 0,
    actualPage: 0
  }

  videos: IPaginator<IMedia> = {
    data: [],
    pageSize: 10,
    itemMax: 0,
    actualPage: 0
  }
  isLoaded: boolean = false

  constructor(private mediaService: MediaService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadImages()
  }

  loadImages(): void {
    this.mediaService.getAllImagesPaginated(this.images).subscribe({
      next: (response: HttpResponse<IPaginator<IMedia>>) => {
        if (response.ok && response.body) {
          this.images = response.body
        }
      },
      error: (error) => {
        throw error;
      }
    })
  }

  loadVideos(): void {
    if (this.isLoaded) return
    this.isLoaded = true
    this.mediaService.getAllVideosPaginated(this.videos).subscribe({
      next: (response: HttpResponse<IPaginator<IMedia>>) => {
        if (response.ok && response.body) {
          this.videos = response.body
        }
      },
      error: (error) => {
        throw error;
      }
    })
  }

}
