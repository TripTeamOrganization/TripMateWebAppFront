import {Component, ChangeDetectorRef} from '@angular/core';
import {FormsModule} from "@angular/forms";
import { HttpClient} from "@angular/common/http";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";

export interface Register {
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  register: Register = {
    email: '',
    password: ''
  };
  registroExitoso: boolean = false;
  emailExistsError: string = '';
  emailError: boolean = false;
  passwordError: boolean = false;
  showAlreadyAddedToast: boolean = false;
  showInvalidCredentialsToast: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient, private router: Router, private authService: AuthService) {}

  registerF() {
    this.authService.register(this.register.email, this.register.password).subscribe({
      next: () => {
        this.router.navigate(['/signin']);
      },
      error: (err) => {
        console.error(err);
        if (err.status === 500) {
          // Mostrar toast de error genérico de servidor
          this.showInvalidCredentialsToast = true;
          setTimeout(() => this.showInvalidCredentialsToast = false, 3000);
        } else if (err.status === 401 || err.status === 409) {
          // Mostrar toasts específicos para otros códigos de estado
          this.showInvalidCredentialsToast = true;
          setTimeout(() => this.showInvalidCredentialsToast = false, 3000);
        }
      }
    });
  }

  validarFormulario() {
    this.emailError = !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.register.email);
    this.passwordError = this.register.password.length < 8;
    this.registroExitoso = false;

    // Forzamos la detección de cambios después de actualizar las variables booleanas
    this.cdr.detectChanges();

    if (!this.emailError && !this.passwordError) {
      this.registerF();
      console.log('Formulario válido');
    } else {
      // Manejo de errores en la consola
      console.error('Errores de validación:');
      if (this.emailError) console.error('Error en el correo electrónico');
      if (this.passwordError) console.error('Error en la contraseña');
    }
  }
}
