import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatLegacyDialog as MatDialog} from '@angular/material/legacy-dialog';
import {Article, IArticle, MenuArticle} from "../../shared/model/IArticle";
import {ArticleService} from "../article.service";
import {IMedia} from "../../shared/model/IMedia";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatLegacySnackBar as MatSnackBar} from "@angular/material/legacy-snack-bar";
import {AddTitleDialogComponent} from "./add-title-dialog/add-title-dialog.component";
import {AddParagrapheDialogComponent} from "./add-paragraphe-dialog/add-paragraphe-dialog.component";
import {AddImageDialogComponent} from "./add-image-dialog/add-image-dialog.component";
import {AddVideoDialogComponent} from "./add-video-dialog/add-video-dialog.component";
import {AddLienDialogComponent} from "./add-lien-dialog/add-lien-dialog.component";
import {AddPDFDialogComponent} from "./add-pdfdialog/add-pdfdialog.component";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  htmlContent: string = '';
  menuArticle?: MenuArticle

  formArticle: FormGroup = new FormGroup<any>({
    title: new FormControl<string>("", [Validators.required]),
    author: new FormControl<string>("", [Validators.required]),
    content: new FormControl<string>("", [Validators.required]),
  })

  uuidArticle?: string
  article?: IArticle
  titre: string = 'Ajouter un article'
  position = 0

  @ViewChild('drawer') drawer!: MatSidenav;
  @ViewChild('contentArea') contentArea!: ElementRef;

  constructor(private articleService: ArticleService, public dialog: MatDialog, private route: ActivatedRoute, private router: Router,
              private clipboard: Clipboard,
              private snackbar: MatSnackBar) {
    if (this.route.snapshot.params['uuid']) {
      this.titre = 'Modifier l\'article'
      this.uuidArticle = this.route.snapshot.params['uuid']
      this.loadArticle()
    }
  }

  ngOnInit(): void {
    this.formArticle.controls['content'].valueChanges
      .subscribe(value => this.htmlContent = value)
  }

  updateCursorPosClick(event: any) {
    this.position = event.target.selectionStart
  }

  updateCursorPosKeybord() {
    this.position = this.contentArea.nativeElement.selectionStart
  }

  loadArticle() {
    if (this.uuidArticle === undefined) {
      return;
    }
    this.articleService.getArticleByUUID(this.uuidArticle).subscribe({
      next: (response: HttpResponse<IArticle>) => {
        if (!response.ok || !response.body) {
          throw new Error('Erreur lors du chargement de l\'article')
        }
        this.article = response.body
        this.formArticle.controls['title'].setValue(response.body.title)
        this.formArticle.controls['author'].setValue(response.body.author)
        this.formArticle.controls['content'].setValue(response.body.html)
      }
    })
  }

  createArticle() {
    const article: IArticle = new Article(
      this.formArticle.controls['author'].value,
      this.formArticle.controls['title'].value,
      this.formArticle.controls['content'].value,
    );
    article.menuArticle = this.menuArticle
    if (this.uuidArticle) {
      article.uuid = this.uuidArticle
      this.articleService.updateArticle(article).subscribe({
        next: (response) => {
          if (response.ok) {
            this.router.navigate(['/article'])
          } else {
            alert('KO');
          }
        }
      });
      return;
    }
    this.articleService.addArticle(article).subscribe({
      next: (response) => {
        if (response.ok) {
          this.router.navigate(['/article'])
        } else {
          alert('KO');
        }
      }
    });

  }

  editContent(content: string): void {
    this.formArticle.controls['content'].setValue(`${this.formArticle.controls['content'].value.slice(0, this.position)}${content}\n${this.formArticle.controls['content'].value.slice(this.position)}`)
    this.contentArea.nativeElement.focus()
    this.drawer.close()
  }

  dialogTitre(): void {
    this.dialog.open(AddTitleDialogComponent, {
      width: '1500px'
    }).afterClosed().subscribe((ret: { titre: string, taille: number }) => {
      if (ret) {
        this.editContent(`<h${ret.taille}>${ret.titre}</h${ret.taille}>`)
      }
    })
  }

  dialogParagraphe(): void {
    this.dialog.open(AddParagrapheDialogComponent, {
      width: '1500px'
    }).afterClosed().subscribe((ret: { content: string, return: boolean }) => {
      if (ret) {
        let content = ret.content.replace(/\n/g, '<br/>\n');
        content = '<p>\n' + content + '\n</p>';
        if (ret.return) {
          content += '<br />'
        }
        this.editContent(content)
      }
    })
  }

  dialogImage(): void {
    this.dialog.open(AddImageDialogComponent, {
      width: '1500px',
      maxHeight: '500px'
    })
      .afterClosed().subscribe((ret: { image: IMedia, taille: string, legende: string, lien: string }) => {
      const mediaName: string = `${ret.image.hash}.${ret.image.type.split('/')[1]}`
      let content = `<div class="media ${ret.taille}"> <img alt="" loading="lazy" src="https://media.ptitbiomed.fr/${mediaName}">`
      if (ret.legende) {
        content += `<p>${ret.legende}</p>`
      }
      content += '</div>'
      if (ret.lien) {
        content = `<a href="${ret.lien}" target="_blank">${content}</a>`
      }
      this.editContent(content)
    })
  }

  dialogVideo(): void {
    this.dialog.open(AddVideoDialogComponent, {
      width: '1500px',
      maxHeight: '500px'
    })
      .afterClosed().subscribe((ret: { video: IMedia, taille: string, legende: string }) => {
      const mediaName: string = `${ret.video.hash}.${ret.video.type.split('/')[1]}`
      let content = `<div class="media ${ret.taille}"> <video controls preload="metadata" width="250"> <source type="${ret.video.type}" src="https://media.ptitbiomed.fr/${mediaName}"> </video>`
      if (ret.legende) {
        content += `<p>${ret.legende}</p>`
      }
      content += '</div>'
      this.editContent(content)
    })
  }

  dialogLien() {
    this.dialog.open(AddLienDialogComponent, {
      width: '1500px'
    }).afterClosed().subscribe((ret: { nom: string, lien: string }) => {
      if (ret) {
        this.editContent(`<a href="${ret.lien}" target="_blank">${ret.nom}</a>`)
      }
    })
  }

  dialogPdf() {
    this.dialog.open(AddPDFDialogComponent, {
      width: '1500px',
      maxHeight: '500px'
    })
      .afterClosed().subscribe((ret: { pdf: IMedia, nom: string }) => {
      const mediaName: string = `${ret.pdf.hash}.${ret.pdf.type.split('/')[1]}`
      let content = `<a href="https://media.ptitbiomed.fr/${mediaName}" target="_blank">`
      if (ret.nom) {
        content += ret.nom
      } else {
        content += ret.pdf.nom
      }
      content += '</a>'
      this.editContent(content)
    })
  }
}
