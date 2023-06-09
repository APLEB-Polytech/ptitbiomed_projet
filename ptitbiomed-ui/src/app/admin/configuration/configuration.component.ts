import {JsonPipe} from "@angular/common";
import {HttpResponse} from "@angular/common/http";
import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfigurationService} from 'src/app/services/configuration.service';
import {Configuration} from "src/app/shared/model/Configuration";

interface ConfigurationForm {
  logoUrl: FormControl<string>,
  footer: FormControl<string>,
}

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ConfigurationComponent implements OnInit {

  private configurationService = inject(ConfigurationService);
  private snackBar = inject(MatSnackBar);

  configurationForm = new FormGroup<ConfigurationForm>({
    logoUrl: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    footer: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
  });

  ngOnInit(): void {
    this.configurationService.getConfiguration().subscribe((configuration: Configuration) => {
      this.configurationForm.setValue(configuration);
    })
  }

  onSubmit(): void {
    this.configurationService.saveConfiguration(this.configurationForm.getRawValue())
      .subscribe({
        error: () => this.snackBar.open('Une erreur est survenue', 'OK', {duration: 10e3}),
        next: (response: HttpResponse<void>) => {
          if (response.ok) {
            this.snackBar.open('Configuration sauvegardée', 'OK', {duration: 2e3});
          } else {
            this.snackBar.open('Erreur lors de la sauvegarde de la configuration', 'OK', {duration: 10e3});
          }
        },
      });
  }

}
