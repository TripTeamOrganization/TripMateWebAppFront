import {Component, OnInit} from '@angular/core';
import {SearchbarComponent} from "../shared/searchbar/searchbar.component";
import {AllapisService} from "../shared/services/allapis.service";
import { Flight } from '../../../../models/flight.interface';
import {HttpClientModule} from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import {ImputsComponent} from "../shared/imputs/imputs.component";
import {PasswordImputsComponent} from "../shared/password-imputs/password-imputs.component";

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [
    SearchbarComponent, HttpClientModule, ImputsComponent, PasswordImputsComponent
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
        this.flights = data;
        console.log(this.flights);
      },
      error => {
        console.error('Error al obtener vuelos:', error);
        // Aquí puedes manejar el error de acuerdo a tus necesidades
      }
    );
  }

  protected readonly crossOriginIsolated = crossOriginIsolated;
}
