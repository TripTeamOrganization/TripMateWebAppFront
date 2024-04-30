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

  ngOnInit() {
    this.getAccommodations();
  }

  getAccommodations() {
    this.apiservice.getAccomodations().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.accomodations = data.map(accomodation => new Accommodation(
            accomodation.nombre,
            accomodation.imagen,
            accomodation.descripcion,
            accomodation.ubicacion
          ));
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
      accomodation.nombre.toLowerCase().includes(trimmedQuery)
    );
    console.log('Alojamientos filtrados:', this.filteredAccomodations);
  }

  protected readonly event = event;
}
