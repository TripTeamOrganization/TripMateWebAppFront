import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardImage} from "@angular/material/card";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardImage
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {

}
