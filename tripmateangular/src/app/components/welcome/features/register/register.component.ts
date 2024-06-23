import {Component, ChangeDetectorRef} from '@angular/core';
import {FormsModule} from "@angular/forms";
import { HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

export interface Register {
  nombre: string;
  apellidos: string;
  dni: string;
  email: string;
  password: string;
  telefono: string;
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
    nombre: '',
    apellidos: '',
    dni: '',
    email: '',
    password: '',
    telefono: ''
  };
  registroExitoso: boolean = false;
  emailExistsError: string = '';
  nombreError: boolean = false;
  apellidosError: boolean = false;
  dniError: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;
  telefonoError: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient, private router: Router) {}

  validarFormulario() {
    this.nombreError = this.register.nombre.length < 3 || this.register.nombre.length > 15;
    this.apellidosError = this.register.apellidos.length < 3 || this.register.apellidos.length > 15;
    this.dniError = !/^\d{8}$/.test(this.register.dni);
    this.emailError = !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.register.email);
    this.passwordError = this.register.password.length < 8;
    this.telefonoError = !/^\d{9}$/.test(this.register.telefono);
    this.registroExitoso = false;

    // Forzamos la detección de cambios después de actualizar las variables booleanas
    this.cdr.detectChanges();

    if (!this.nombreError && !this.apellidosError && !this.dniError && !this.emailError && !this.passwordError && !this.telefonoError) {
      // Aquí puedes realizar cualquier acción adicional después de la validación exitosa
      console.log('Formulario válido');
    } else {
      // Manejo de errores en la consola
      console.error('Errores de validación:');
      if (this.nombreError) console.error('Error en el nombre');
      if (this.apellidosError) console.error('Error en los apellidos');
      if (this.dniError) console.error('Error en el DNI');
      if (this.emailError) console.error('Error en el correo electrónico');
      if (this.passwordError) console.error('Error en la contraseña');
      if (this.telefonoError) console.error('Error en el número de teléfono');
    }
    if (!this.nombreError && !this.apellidosError && !this.dniError && !this.emailError && !this.passwordError && !this.telefonoError) {
      this.http.get('https://6630957fc92f351c03da5174.mockapi.io/tripmate/users').pipe(map(response => response as any[]))
        .subscribe(
          (users: any[]) => {
            if (users.some(user => user.email == this.register.email)) {
              this.emailExistsError = 'Este correo electrónico ya está en uso.';
            } else {
              this.http.post('https://6630957fc92f351c03da5174.mockapi.io/tripmate/users', this.register)
                .subscribe(
                  response => {
                    console.log(response);
                    this.registroExitoso = true;
                    this.router.navigateByUrl('signin')
                  },
                  error => console.log(error)
                );
            }
          },
          error => console.log(error)
        );
    }
  }
}
