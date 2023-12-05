import {Component, inject, OnInit} from '@angular/core';
import {AssetService} from "src/app/services/asset.service";

@Component({
  providers: [AssetService],
  selector: 'app-footer',
  styleUrls: ['./footer.component.css'],
  template: '{{ footer }}',
})
export class FooterComponent implements OnInit {

  private assetService = inject(AssetService);

  footer: string = '';

  ngOnInit(): void {
    this.assetService.getFooter().subscribe({
      next: (footer: string) => {
        this.footer = footer;
      },
    });
  }

}
