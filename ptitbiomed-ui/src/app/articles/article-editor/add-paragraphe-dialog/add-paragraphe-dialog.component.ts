import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-paragraphe-dialog',
  templateUrl: './add-paragraphe-dialog.component.html',
  styleUrls: ['./add-paragraphe-dialog.component.css']
})
export class AddParagrapheDialogComponent implements OnInit {
  content = new FormControl<string>('');
  return = new FormControl<boolean>(true)

  constructor(public dialogRef: MatDialogRef<AddParagrapheDialogComponent>) {
  }

  ngOnInit(): void {
  }

  valid(): void {
    this.dialogRef.close({content: this.content.value, return: this.return.value});
  }
}
