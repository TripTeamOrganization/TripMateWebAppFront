import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TripmateApiService } from "../../../../services/tripmate-api.service";
import { Flight } from '../../../../models/flight.model';
import { HttpClientModule } from "@angular/common/http";
import { InputsComponent } from "../../../../../public/shared/inputs/inputs.component";
import { PasswordImputsComponent } from "../../../../../public/shared/password-imputs/password-imputs.component";
import { SearchbarComponent } from "../../../../../public/shared/searchbar/searchbar.component";
import { MainFilterComponent } from "../../../../../public/shared/main-filter/main-filter.component";
import { CardgroupComponent } from "../../../../../public/shared/groups/cardgroup";
import { CardmainComponent } from "../../../../../public/shared/cardmain/cardmain.component";

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
    this.getFlights().then(() => {
      // Llamada a filterFlightsByPrice aquí, después de que los datos de vuelo estén disponibles
      this.filterFlightsByPrice(100, 500); // Ejemplo de valores mínimos y máximos
    });
  }

  getFlights(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.allapisService.getFlights().subscribe(
        (data: any) => {
          if (Array.isArray(data)) {
            this.flights = data.map(flight => new Flight(
              flight.id,
              flight.nombre,
              flight.imagen,
              flight.tipo,
              flight.duracion,
              flight.ubicacion,
              flight.precio,
              flight.descripcion
            ));
            resolve(); // Resuelve la promesa una vez que los datos de vuelo estén disponibles
          } else {
            console.error('El formato de datos recibido no es un array.');
            reject('El formato de datos recibido no es un array.'); // Rechaza la promesa en caso de un error
          }
        },
        error => {
          console.error('Error al obtener datos de vuelos:', error);
          reject(error); // Rechaza la promesa en caso de un error
        }
      );
    });
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

  filter(callback: (value: Flight, index?: number, array?: Flight[]) => boolean): Flight[] {
    const filteredArray: Flight[] = [];

    for (let i = 0; i < this.flights.length; i++) {
      if (callback(this.flights[i], i, this.flights)) {
        filteredArray.push(this.flights[i]);
      }
    }

    return filteredArray;
  }

  filterFlightsByPrice(min: number, max: number) {
    if (!this.flights) {
      console.error('Flights data is not available.');
      return; // Salir de la función si los datos de vuelo no están disponibles
    }

    try {
      this.filteredFlights = this.filter(flight => {
        const precioNumerico = parseFloat(flight.precio.replace(/[^\d.]/g, ''));
        return !isNaN(precioNumerico) && precioNumerico >= min && precioNumerico <= max;
      });
    } catch (error: any) { // Anotación de tipo any para error
      console.error('Error filtering flights by price:', error.message);
      console.error(error); // Imprimir el objeto de error completo para obtener más detalles
      // S/. $   agregar más lógica si es necesario, como mostrar un mensaje de error al usuario
    }
  }

}
