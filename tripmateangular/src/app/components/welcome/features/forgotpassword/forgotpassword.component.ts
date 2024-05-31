import { Component } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripmateApiService } from "../../../../services/tripmate-api.service";

@Component({
  standalone: true,
  selector: 'forgot-password',
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TripmateApiService],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotPasswordComponent {
  changePasswordForm: FormGroup;
  userId: string | number = 1;
  newPassword: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private tripmateApiService: TripmateApiService, private fb: FormBuilder) {
    this.changePasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  deletePassword(): void {
    this.tripmateApiService.updatePassword(this.userId, null).subscribe(
      response => {
        console.log(response);
        this.successMessage = 'Contraseña eliminada';
        this.errorMessage = null;
      },
      error => {
        console.error(error);
        this.errorMessage = 'Error eliminando contraseña';
        this.successMessage = null;
      }
    );
  }

  updatePassword(): void {
    if (this.changePasswordForm.valid) {
      this.newPassword = this.changePasswordForm.value.newPassword;
      this.tripmateApiService.updatePassword(this.userId, this.newPassword).subscribe(
        response => {
          console.log(response);
          this.successMessage = 'Contraseña actualizada';
          this.errorMessage = null;
        },
        error => {
          console.error(error);
          this.errorMessage = 'Error actualizando contraseña';
          this.successMessage = null;
        }
      );
    }
  }
}
