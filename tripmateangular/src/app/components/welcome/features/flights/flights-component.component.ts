import {Component, OnInit} from '@angular/core';
import {SearchbarComponent} from "../shared/searchbar/searchbar.component";
import {AllapisService} from "../shared/services/allapis.service";
import { Flight } from '../../../../models/flight.interface';
import {HttpClientModule} from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import {ImputsComponent} from "../shared/imputs/imputs.component";
import {PasswordImputsComponent} from "../shared/password-imputs/password-imputs.component";
import {CardgroupComponent} from "../shared/groups/cardgroup";
import {CardmainComponent} from "../shared/cardmain/cardmain.component";

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [
    SearchbarComponent, HttpClientModule, ImputsComponent, PasswordImputsComponent, CardgroupComponent, CardmainComponent
  ],
  templateUrl: './flights-component.component.html',
  styleUrl: './flights-component.component.scss'
})
export class FlightsComponentComponent implements OnInit {
  flights: Flight[] = [];

  constructor(private allapisService: AllapisService) {}

  ngOnInit() {
    this.getFlights();
  }

  getFlights() {
    this.allapisService.getFlights().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.flights = data.map(flight => new Flight(
            flight.nombre,
            flight.imagen,
            flight.tipo,
            flight.duracion,
            flight.ubicacion,
            flight.precio
          ));
        } else {
          console.error('El formato de datos recibido no es un array.');
        }
      },
      error => {
        console.error('Error al obtener datos de vuelos:', error);
      }
    );
  }
}
