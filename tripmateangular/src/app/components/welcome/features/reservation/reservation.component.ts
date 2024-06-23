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

  constructor(private reservationService: ReservationsService) {

  }
  borrarReservas(){
    this.reservationService.reservas = [];
  }

  //Al iniciar el componente se formatea el precio de cadena a número.
  ngOnInit(): void {

    //una vez formateado el precio se guarda en la variable "reservas" que se muestra en el html
    //que solo se muestre una vez el nombre de la reserva
    this.reservas = this.reservationService.reservas;
    //si se refresca la pagina, borrar el arreglo de reservas

    this.borrarReservas();
  }

}

