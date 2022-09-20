import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NouveauMenu} from "../panel.component";

@Component({
  selector: 'app-add-child-menu',
  templateUrl: './add-child-menu.component.html',
  styleUrls: ['./add-child-menu.component.css']
})
export class AddChildMenuComponent {

  formAddChild: FormGroup = new FormGroup<any>({
    label: new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  constructor(public dialogRef: MatDialogRef<AddChildMenuComponent>,) {
  }

  valid(): void {
    const obj: NouveauMenu = {label: this.formAddChild.get('label')?.value}
    this.dialogRef.close(obj)
  }

}
