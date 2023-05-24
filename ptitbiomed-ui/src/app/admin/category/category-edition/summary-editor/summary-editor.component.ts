import {Component, Inject} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-summary-editor',
  templateUrl: './summary-editor.component.html',
  styleUrls: ['./summary-editor.component.css']
})
export class SummaryEditorComponent {

  summaryHtml: FormControl<string> = new FormControl<string>(this.html, {nonNullable: true})

  constructor(
    private dialogRef: MatDialogRef<SummaryEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private html: string,
  ) {
    dialogRef.disableClose = true;
  }

  validate(): void {
    const html = this.summaryHtml.value.trim();
    this.dialogRef.close(html === '' ? null : html);
  }

  cancel() {
    this.dialogRef.close(this.html);
  }

}
