import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-article-renderer',
  templateUrl: './article-renderer.component.html',
  styleUrls: ['./article-renderer.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ArticleRendererComponent {

  @Input()
  content = "";
}
