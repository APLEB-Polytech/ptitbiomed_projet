import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-lien-dialog',
  templateUrl: './add-lien-dialog.component.html',
  styleUrls: ['./add-lien-dialog.component.css']
})
export class AddLienDialogComponent implements OnInit {

  formGroup: FormGroup = new FormGroup<any>({
    lien: new FormControl<string>("", [Validators.required]),
    nom: new FormControl<string>("", [Validators.required]),
  })

  constructor(public dialogRef: MatDialogRef<AddLienDialogComponent>) {
  }

  ngOnInit(): void {
  }

  valid() {
    this.dialogRef.close({nom: this.formGroup.controls['nom'].value, lien: this.formGroup.controls['lien'].value});
  }
}
