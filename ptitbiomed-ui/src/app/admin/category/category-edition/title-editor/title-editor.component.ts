import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-title-editor',
  templateUrl: './title-editor.component.html',
  styleUrls: ['./title-editor.component.css']
})
export class TitleEditorComponent implements OnInit {

  formTitle: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<TitleEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private title: string,
    private formBuilder: FormBuilder,
  ) {
    dialogRef.disableClose = true;

    this.formTitle = formBuilder.group({
      title: new FormControl<string>(this.title, [Validators.required, Validators.pattern(/\S/)]), // not blank
    });
  }

  ngOnInit(): void {
  }

  validate(): void {
    const title = this.formTitle.controls['title'].value.trim();

    if (!title) this.cancel();
    else this.dialogRef.close(title);
  }

  cancel(): void {
    this.dialogRef.close(this.title);
  }

}
