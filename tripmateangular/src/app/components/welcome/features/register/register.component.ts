import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    ReactiveFormsModule
  ],
  standalone: true
})
export class RegisterComponent {
  registerForm: FormGroup;
  mensajeRegistro: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    });
  }

  validarFormulario() {
    if (this.registerForm.valid) {
      // El formulario es válido, puedes procesar los datos
      const formData = this.registerForm.value;
      // Aquí puedes agregar el código para registrarse
      this.mensajeRegistro = 'Registrando...';
      console.log(formData);
    } else {
      // El formulario tiene errores, puedes mostrar un mensaje de error
      this.mensajeRegistro = '';
    }
  }
}
