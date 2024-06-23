import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardImage} from "@angular/material/card";
import {ReservationsService} from "../../../../services/reservationsService.service";

import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardImage,
    RouterLink
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit {

  reservas: any = [];
  total: number = 0;

  constructor(private reservationService: ReservationsService) {}

  ngOnInit(): void {
    this.reservas = this.reservationService.obtenerReserva();
  }
}
