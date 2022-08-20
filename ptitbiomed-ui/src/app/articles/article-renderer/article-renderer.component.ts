import {Component, Input, OnInit} from '@angular/core';

@Component({
	selector: 'app-article-renderer',
	templateUrl: './article-renderer.component.html',
	styleUrls: ['./article-renderer.component.css']
})
export class ArticleRendererComponent implements OnInit {

	@Input()
	content: string = "";

	constructor() {
	}

	ngOnInit(): void {
	}

}
