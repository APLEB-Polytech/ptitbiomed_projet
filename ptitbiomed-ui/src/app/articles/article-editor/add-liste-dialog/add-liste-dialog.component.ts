import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-liste-dialog',
  templateUrl: './add-liste-dialog.component.html',
  styleUrls: ['./add-liste-dialog.component.css']
})
export class AddListeDialogComponent implements OnInit {

  liste: FormArray<FormControl<string | null>> = new FormArray<FormControl<string | null>>([]);

  constructor(public dialogRef: MatDialogRef<AddListeDialogComponent>) {
  }

  ngOnInit(): void {
    this.ajouterChamp();
  }

  /**
   * Teste si au moins un des champs est vide
   */
  testIfArrayEmpty(): boolean {
    return this.liste.controls.map(control => control.value).every(value => value !== "")
  }

  ajouterChamp() {
    const formControl = new FormControl<string>("");
    this.liste.controls.push(formControl);
    formControl.valueChanges.subscribe(value => {
      if (this.testIfArrayEmpty()) {
        this.ajouterChamp();
      }
    })
  }

  valid() {
    this.dialogRef.close({
      liste: this.liste.controls
        .map(control => control.value)
        .filter(value => value !== "")
        .filter(value => value !== null)
    });
  }

}
