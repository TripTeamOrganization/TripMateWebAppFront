import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule para módulos secundarios
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  paymentForm: FormGroup;
  formIsValid: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      // Si el formulario es válido, actualiza formIsValid a true
      this.formIsValid = true;
      // Aquí puedes enviar los datos del formulario al servidor para procesar el pago
      console.log(this.paymentForm.value);

    } else {
      // Si el formulario no es válido, muestra un mensaje en la consola
      console.log('Formulario inválido');
    }
  }

  onSubmitButton(){
    this.router.navigate(['payment-succesfully']);
  }


}
