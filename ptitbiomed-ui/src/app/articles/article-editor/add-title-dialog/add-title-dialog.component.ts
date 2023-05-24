import {Component, inject} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-title-dialog',
  templateUrl: './add-title-dialog.component.html',
  styleUrls: ['./add-title-dialog.component.css']
})
export class AddTitleDialogComponent {

  taille = new FormControl<number>(1);
  titre = new FormControl<string>('');
  private dialogRef: MatDialogRef<AddTitleDialogComponent> = inject(MatDialogRef)


  valid(): void {
    this.dialogRef.close({titre: this.titre.value, taille: this.taille.value});
  }
}
