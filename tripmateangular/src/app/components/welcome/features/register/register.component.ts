import { Component, ChangeDetectorRef } from '@angular/core';
import {FormsModule} from "@angular/forms";

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
    FormsModule
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

  nombreError: boolean = false;
  apellidosError: boolean = false;
  dniError: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;
  telefonoError: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  validarFormulario() {
    this.nombreError = this.register.nombre.length < 3 || this.register.nombre.length > 15;
    this.apellidosError = this.register.apellidos.length < 3 || this.register.apellidos.length > 15;
    this.dniError = !/^\d{8}$/.test(this.register.dni);
    this.emailError = !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.register.email);
    this.passwordError = this.register.password.length < 8;
    this.telefonoError = !/^\d{9}$/.test(this.register.telefono);

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
  }
}
