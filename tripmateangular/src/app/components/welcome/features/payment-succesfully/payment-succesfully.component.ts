import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-succesfully',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './payment-succesfully.component.html',
  styleUrl: './payment-succesfully.component.scss'
})
export class PaymentSuccesfullyComponent {
  constructor(private router: Router) {
  }

  onSubmitButton(){
    this.router.navigate(['accommodations']);
  }
}
