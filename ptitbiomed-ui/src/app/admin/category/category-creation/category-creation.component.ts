import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-category-creation',
  templateUrl: './category-creation.component.html',
  styleUrls: ['./category-creation.component.css']
})
export class CategoryCreationComponent {

  formCreateCategory: FormGroup = new FormGroup<any>({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(
    public dialogRef: MatDialogRef<CategoryCreationComponent>,
  ) { }

  validate(): void {
    this.dialogRef.close(this.formCreateCategory.controls['name'].value);
  }

}
