import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterLink} from "@angular/router";
import { HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {NgIf} from "@angular/common";

export interface SignIn {
  email: string;
  password: string;
}
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf
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
  badCredentials: boolean = false;
  showInvalidCredentialsToast: boolean = false;
  showAlreadyAddedToast: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient, private router: Router,private authService:AuthService) {}
  login() {
      this.authService.login(this.signin.email, this.signin.password).subscribe({
        next: () => this.router.navigate(['/accommodations']),
        error: (err) => {
          console.error(err);
          if (err.status === 500) {
            this.showInvalidCredentialsToast = true;
            setTimeout(() => this.showInvalidCredentialsToast = false, 3000);
          } else if (err.status === 401 || err.status === 409) {
            this.showInvalidCredentialsToast = true;
            setTimeout(() => this.showInvalidCredentialsToast = false, 3000);
          }
        }
      });
  }
  validarFormulario() {
    this.emailError = !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.signin.email);
    this.passwordError = this.signin.password.length < 8;

    // Forzamos la detección de cambios después de actualizar las variables booleanas
    this.cdr.detectChanges();

    if (!this.emailError && !this.passwordError) {
      this.login();
    } else {
      // Manejo de errores en la consola
      console.error('Errores de validación:');
      if (this.emailError) console.error('Error en el correo electrónico');
      if (this.passwordError) console.error('Error en la contraseña');
    }
  }

  checkCredentials(email: string, password: string) {
    this.http.get('https://6630957fc92f351c03da5174.mockapi.io/tripmate/users').subscribe((data: any) => {
      const user = data.find((item: any) => item.email === email && item.password === password);
      if (user) {
        console.log('Inicio de sesión exitoso');
        this.router.navigateByUrl('accommodations');
      } else {
        this.passwordError = true;
        console.error('Correo electrónico o contraseña incorrectos');
      }
    });
  }
}
