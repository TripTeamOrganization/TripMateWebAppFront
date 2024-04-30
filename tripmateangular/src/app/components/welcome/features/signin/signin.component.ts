import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterLink} from "@angular/router";
import { HttpClient} from "@angular/common/http";

export interface SignIn {
  email: string;
  password: string;
}
@Component({
  selector: 'app-signin',
  standalone: true,
    imports: [
        FormsModule,
        RouterLink
    ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  signin: SignIn = {
    email: '',
    password: '',
  };

  emailNotFound: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {}

  validarFormulario() {
    this.emailError = !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.signin.email);
    this.passwordError = this.signin.password.length < 8;
    this.checkEmail(this.signin.email);

    // Forzamos la detección de cambios después de actualizar las variables booleanas
    this.cdr.detectChanges();

    if (!this.emailError && !this.passwordError) {
      // Aquí puedes realizar cualquier acción adicional después de la validación exitosa
      console.log('Formulario válido');
    } else {
      // Manejo de errores en la consola
      console.error('Errores de validación:');
      if (this.emailError) console.error('Error en el correo electrónico');
      if (this.passwordError) console.error('Error en la contraseña');
    }
  }
  checkEmail(email: string) {
    this.http.get('http://localhost:3000').subscribe((data: any) => {
      if (!data.some((item: any) => item.email === email)) {
        this.emailNotFound = true;
        this.cdr.detectChanges();
      }
      else {console.log('Email no encontrado')}
    });
  }
}
