import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {UserSignupRequest} from "./UserSignupRequest";
import {UserService} from "../user.service";
import {HttpResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  formGroup: FormGroup = new FormGroup<any>({
      username: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
      passwordConfirm: new FormControl<string>('', [Validators.required, Validators.minLength(8), this.passwordValidator()]),
    }
  )

  private userService: UserService = inject(UserService)
  private snackbar: MatSnackBar = inject(MatSnackBar)

  passwordValidator(): ValidatorFn {
    return (): ValidationErrors | null => {
      if (!this.formGroup) {
        return null
      }
      return (this.formGroup.controls['password'].value !== this.formGroup.controls['passwordConfirm'].value) ? {message: "Les mots de passe ne sont pas identiques"} : null
    };
  }

  submit() {
    const signupRequest: UserSignupRequest = new UserSignupRequest(
      this.formGroup.get("username")?.value,
      this.formGroup.get("email")?.value,
      this.formGroup.get("password")?.value,
    )
    this.userService.addUser(signupRequest).subscribe({
      next: (res: HttpResponse<any>) => {
        if (!res.ok) {
          this.snackbar.open("Erreur lors de l'ajout de l'utilisateur")
          return;
        }
        this.snackbar.open("Utilisateur ajoute")
        window.history.back()
      },
      error: err => {
        this.snackbar.open("Erreur lors de l'ajout de l'utilisateur")
        throw new Error(err)
      }

    })
  }
}
