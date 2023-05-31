import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-title-editor',
  templateUrl: './title-editor.component.html',
  styleUrls: ['./title-editor.component.css']
})
export class TitleEditorComponent {

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

  validate(): void {
    const title = this.formTitle.controls['title'].value.trim();

    if (!title) this.cancel();
    else this.dialogRef.close(title);
  }

  cancel(): void {
    this.dialogRef.close(this.title);
  }

}
