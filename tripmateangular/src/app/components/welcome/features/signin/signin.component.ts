import { Component } from '@angular/core';

export interface SignIn {
  email: string;
  password: string;
}
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  register: SignIn = {
    email: '',
    password: '',
  };
  emailError: boolean | undefined;
  passwordError: boolean | undefined;

  validarFormulario() {
    this.emailError = !this.register.email || !this.register.email.includes('@');
    this.passwordError = !this.register.password || this.register.password.length < 8;

    if (!this.emailError && !this.passwordError) {
      // Aquí puedes agregar el código para iniciar sesión
      console.log('Iniciando sesión...');
    }
  }
}