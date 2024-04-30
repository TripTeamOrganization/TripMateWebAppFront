import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { TripmateApiService } from "../../../../services/tripmate-api.service";
import { Flight } from '../../../../models/flight.model';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { InputsComponent } from "../../../../../public/shared/inputs/inputs.component";
import { PasswordImputsComponent } from "../../../../../public/shared/password-imputs/password-imputs.component";
import {SearchbarComponent} from "../../../../../public/shared/searchbar/searchbar.component";
import {MainFilterComponent} from "../../../../../public/shared/main-filter/main-filter.component";
import {CardgroupComponent} from "../../../../../public/shared/groups/cardgroup";
import {CardmainComponent} from "../../../../../public/shared/cardmain/cardmain.component";

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [
    SearchbarComponent, HttpClientModule, InputsComponent, PasswordImputsComponent, CardgroupComponent, CardmainComponent, MainFilterComponent, SearchbarComponent, MainFilterComponent, CardgroupComponent, CardmainComponent
  ],
  templateUrl: './flights-component.component.html',
  styleUrls: ['./flights-component.component.scss']
})
export class FlightsComponentComponent implements OnInit {
  flights: Flight[] = [];
  filteredFlights: Flight[] = [];
  searchTimer: any; // Declarar la propiedad searchTimer

  constructor(private allapisService: TripmateApiService, private cdr: ChangeDetectorRef) { }

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
            flight.precio,
            flight.descripcion
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

  searchHandler(searchQuery: any) {

    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }

    if (searchQuery.trim().length === 0) {
      this.filteredFlights = this.flights;
    } else if (searchQuery.trim().length === 1) {
    } else {
      const SEARCH_MIN_DELAY = 500;
      let startTime = performance.now();

      this.searchTimer = setTimeout(() => {
        const trimmedQuery = searchQuery.trim().toLowerCase();
        console.log('Query recortada y en minúsculas:', trimmedQuery);

        this.filteredFlights = [];
        for (const flight of this.flights) {
          if (flight.nombre.toLowerCase().includes(trimmedQuery)) {
            this.filteredFlights.push(flight);
          }
        }

        if (this.filteredFlights.length === 0) {
          return;
        }

        console.log('Vuelos filtrados:', this.filteredFlights);

        let endTime = performance.now();
        let searchDuration = endTime - startTime;
        let delay = Math.max(SEARCH_MIN_DELAY, searchDuration);
        setTimeout(() => {
        }, delay);

      }, SEARCH_MIN_DELAY);
    }
  }








}
