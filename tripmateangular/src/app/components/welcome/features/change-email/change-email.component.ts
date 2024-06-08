import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {TripmateApiService} from "../../../../services/tripmate-api.service";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-change-email',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatError,
    MatInput,
    NgIf,
    MatFormField,
    MatButton,
    MatCardModule
  ],
  templateUrl: './change-email.component.html',
  styleUrl: './change-email.component.scss'
})
export class ChangeEmailComponent {
  emailForm: FormGroup;
  userId: string = 'userId';

  constructor(private formBuilder: FormBuilder, private tripMateApiService: TripmateApiService) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.emailForm.valid) {
      this.tripMateApiService.updateEmail(this.userId, this.emailForm.value.email).subscribe(
        response => {
          console.log('Email updated successfully', response);
          alert('Email actualizado correctamente');
        },
        error => {
          console.log('Error actualizando email', error);
        }
      );
    }
  }
}
