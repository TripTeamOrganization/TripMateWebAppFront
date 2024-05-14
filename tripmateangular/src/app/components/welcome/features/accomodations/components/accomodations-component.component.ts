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
  accomodationData: Accommodation;
  accomodations: Accommodation[] = [];
  filteredAccomodations: Accommodation[] = [];
  constructor(private apiservice: TripmateApiService) {
    this.accomodationData = {} as Accommodation;
  }

  minLimit: number = 0;
  maxLimit: number = 999;

  ngOnInit() {
    this.getAccommodations();
  }

  getValues(event: { min: number, max: number }) {
    //console.log('minValue in restaurant:',  event.min);
    //console.log('maxValue in restaurant:',  event.max);

    this.minLimit = event.min;
    this.maxLimit = event.max;

    this.getAccommodations();
  }

  getAccommodations() {
    this.apiservice.getAccomodations().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.accomodations = [];
           this.filteredAccomodations = [];
          this.accomodations = data.map(accomodation => new Accommodation(
            accomodation.id,
            accomodation.nombre,
            accomodation.imagen,
            accomodation.descripcion,
            accomodation.ubicacion,
            accomodation.precio
          ));
          //this.accomodations.push(newAccomodation);
          //this.filteredAccomodations.push(newAccomodation);
        } else {
          console.error('El formato de datos recibido no es un array.');
        }
      },
      error => {
        console.error('Error al obtener datos de actividades:', error);
      }
    );
    //filtrar con los valores mín y max:
    console.log('filtrados:', this.filteredAccomodations);

    this.filteredAccomodations = [];
    this.accomodations.forEach((value: Accommodation) => {
        console.log('id in integer', eval(value.id));
       const precio = eval(value.id);

       if (precio >= this.minLimit && precio <= this.maxLimit)
       {
          this.filteredAccomodations.push(value);
       }
    });

    console.log(this.accomodations);
  }

  searchHandler(searchQuery: any) {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    this.filteredAccomodations = this.accomodations.filter(accomodation =>
      accomodation.nombre.toLowerCase().includes(trimmedQuery)
    );
    console.log('Alojamientos filtrados:', this.filteredAccomodations);
  }

  protected readonly event = event;
}
