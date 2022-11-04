import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IMenu, Menu} from "../../../shared/model/IMenu";

@Component({
  selector: 'app-add-child-menu',
  templateUrl: './add-child-menu.component.html',
  styleUrls: ['./add-child-menu.component.css']
})
export class AddChildMenuComponent {

  formAddChild: FormGroup = new FormGroup<any>({
    label: new FormControl(this.menu?.label, [Validators.required, Validators.minLength(4)])
  })

  constructor(public dialogRef: MatDialogRef<AddChildMenuComponent>,
              @Inject(MAT_DIALOG_DATA) public menu: IMenu) {
  }

  valid(): void {
    if (this.menu) {
      this.menu.label = this.formAddChild.get('label')?.value;
    } else {
      this.menu = {
        label: this.formAddChild.get('label')?.value,
        rank: -1
      }
    }
    this.dialogRef.close(this.menu);
  }

}
