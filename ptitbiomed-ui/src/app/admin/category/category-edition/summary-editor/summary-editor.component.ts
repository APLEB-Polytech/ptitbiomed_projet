import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef
} from "@angular/material/legacy-dialog";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-summary-editor',
  templateUrl: './summary-editor.component.html',
  styleUrls: ['./summary-editor.component.css']
})
export class SummaryEditorComponent implements OnInit {

  formSummary: FormGroup = new FormGroup<any>({
    summaryHtml: new FormControl<string>(this.html)
  });

  constructor(
    private dialogRef: MatDialogRef<SummaryEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private html: string,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  validate(): void {
    let html = this.formSummary.controls['summaryHtml'].value.trim();
    this.dialogRef.close(html === '' ? null : html);
  }

  cancel() {
    this.dialogRef.close(this.html);
  }

}
