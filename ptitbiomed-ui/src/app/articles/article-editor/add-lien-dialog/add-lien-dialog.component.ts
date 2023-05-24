import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-lien-dialog',
  templateUrl: './add-lien-dialog.component.html',
  styleUrls: ['./add-lien-dialog.component.css']
})
export class AddLienDialogComponent {

  formGroup: FormGroup = new FormGroup<{ lien: FormControl<string>, nom: FormControl<string> }>({
    lien: new FormControl<string>("", {nonNullable: true, validators: [Validators.required]}),
    nom: new FormControl<string>("", {nonNullable: true, validators: [Validators.required]}),
  })

  constructor(public dialogRef: MatDialogRef<AddLienDialogComponent>) {
  }

  valid() {
    this.dialogRef.close({nom: this.formGroup.controls['nom'].value, lien: this.formGroup.controls['lien'].value});
  }
}
