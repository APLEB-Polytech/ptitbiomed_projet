import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-title-dialog',
  templateUrl: './add-title-dialog.component.html',
  styleUrls: ['./add-title-dialog.component.css']
})
export class AddTitleDialogComponent implements OnInit {

  taille = new FormControl<number>(1);
  titre = new FormControl<string>('');

  constructor(public dialogRef: MatDialogRef<AddTitleDialogComponent>) {
  }

  ngOnInit(): void {
  }


  valid(): void {
    this.dialogRef.close({titre: this.titre.value, taille: this.taille.value});
  }
}
