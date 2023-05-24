import {Component, inject} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-paragraphe-dialog',
  templateUrl: './add-paragraphe-dialog.component.html',
  styleUrls: ['./add-paragraphe-dialog.component.css']
})
export class AddParagrapheDialogComponent {
  content = new FormControl<string>('');
  return = new FormControl<boolean>(true)
  public dialogRef: MatDialogRef<AddParagrapheDialogComponent> = inject(MatDialogRef)

  valid(): void {
    this.dialogRef.close({content: this.content.value, return: this.return.value});
  }
}
