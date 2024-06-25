import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../../../../models/accomodation.model";
import {TripmateApiService} from "../../../../../services/tripmate-api.service";
import {NgForOf, NgIf} from "@angular/common";
import {SearchbarComponent} from "../../../../../../public/shared/searchbar/searchbar.component";
import {MainFilterComponent} from "../../../../../../public/shared/main-filter/main-filter.component";
import {CardgroupComponent} from "../../../../../../public/shared/groups/cardgroup";
import {CardmainComponent} from "../../../../../../public/shared/cardmain/cardmain.component";
import {ItineraryComponent} from "../../itinerary/itinerary.component";

@Component({
  selector: 'app-accomodations',
  standalone: true,
  imports: [
    SearchbarComponent,
    CardmainComponent,
    CardgroupComponent,
    NgForOf,
    NgIf,
    MainFilterComponent,
    SearchbarComponent,
    MainFilterComponent,
    CardgroupComponent,
    CardmainComponent,
    ItineraryComponent
  ],
  templateUrl: './accomodations-component.component.html',
  styleUrl: './accomodations-component.component.scss'
})
export class AccomodationsComponentComponent implements OnInit {

  //Variables:
  accomodationData: Accommodation;
  accomodations: Accommodation[] = [];
  filteredAccomodations: Accommodation[] = [];
  minLimit: number = 0;
  maxLimit: number = 999;


  constructor(private apiservice: TripmateApiService) {
    this.accomodationData = {} as Accommodation;
  }

  ngOnInit() {
    this.getAccommodations();
  }

  getValues(event: { min: number, max: number }) {
    console.log('minValue in alojamientos:',  event.min);
    console.log('maxValue in alojamientos',  event.max);

    this.minLimit = event.min;
    this.maxLimit = event.max;

    this.getAccommodations();
  }

  getPrice(priceInString: String): number {

    //precioCadena: S/ 543 ó $145.11 por noche
    let price: number = 0;

    //lógica de conversión:
    const result = priceInString.split(' '); //['S/', '543', ó, ...]
    //console.log('price in string:', result[1]);

    return eval(result[1]);
    //((return price;
  }

  getAccommodations() {
    this.apiservice.getAccomodations().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.accomodations = data.map(accomodation => new Accommodation(
            accomodation.id,
            accomodation.name,
            accomodation.imagePath,
            accomodation.description,
            accomodation.location,
            accomodation.price
          ));

          //actualización del filtro:
          //Algoritmo: 1. limpiar el fitlro
          //2.recorrer el arreglo y 3. filtrar los que se encuentran del rango del precio
          //3. crear la función de acuerdo al formato del API

          this.filteredAccomodations = [];

          this.accomodations.forEach((value: Accommodation) => {

            const precio: number = this.getPrice(value.price);
            if (precio >= this.minLimit && precio <= this.maxLimit)
            {
              this.filteredAccomodations.push(value);
            }

          });

        } else {
          console.error('El formato de datos recibido no es un array.');
        }
      },
      error => {
        console.error('Error al obtener datos de actividades:', error);
      }
    );
  }

  searchHandler(searchQuery: any) {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    this.filteredAccomodations = this.accomodations.filter(accomodation =>
      accomodation.name.toLowerCase().includes(trimmedQuery)
    );
    console.log('Alojamientos filtrados:', this.filteredAccomodations);
  }

  protected readonly event = event;
}
