import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Article, IArticle} from "../../shared/model/IArticle";
import {ArticleService} from "../article.service";

@Component({
	selector: 'app-article-editor',
	templateUrl: './article-editor.component.html',
	styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

	htmlContent: string = '';

	formArticle: FormGroup = new FormGroup<any>({
		title: new FormControl<string>("", [Validators.required]),
		author: new FormControl<string>("", [Validators.required]),
		content: new FormControl<string>("", [Validators.required]),
	})

	constructor(private articleService: ArticleService) {
	}

	ngOnInit(): void {
		this.formArticle.controls['content'].valueChanges
			.subscribe(value => this.htmlContent = value)
	}

	createArticle() {
		const article: IArticle = new Article(
			this.formArticle.controls['author'].value,
			this.formArticle.controls['title'].value,
			this.formArticle.controls['content'].value,
		);
		this.articleService.addArticle(article).subscribe({
			next: (response) => {
				if (response.ok) {
					alert('OK');
				} else {
					alert('KO');
				}
			}
		});
	}
}
