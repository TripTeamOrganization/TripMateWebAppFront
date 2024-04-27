import {Component, OnInit} from '@angular/core';
import {SearchbarComponent} from "../shared/searchbar/searchbar.component";
import {CardmainComponent} from "../shared/cardmain/cardmain.component";
import {CardgroupComponent} from "../shared/groups/cardgroup";
import {Accommodation} from "../../../../models/accomodation.interface";
import {AllapisService} from "../shared/services/allapis.service";
import {NgForOf, NgIf} from "@angular/common";
import {MainFilterComponent} from "../shared/main-filter/main-filter.component";

@Component({
  selector: 'app-accomodations',
  standalone: true,
    imports: [
        SearchbarComponent,
        CardmainComponent,
        CardgroupComponent,
        NgForOf,
        NgIf,
        MainFilterComponent
    ],
  templateUrl: './accomodations-component.component.html',
  styleUrl: './accomodations-component.component.scss'
})
export class AccomodationsComponentComponent implements OnInit {
  accomodationData: Accommodation;
  accomodations: Accommodation[] = [];
  filteredAccomodations: Accommodation[] = [];
  constructor(private apiservice: AllapisService) {
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
            accomodation.datosAdicionales,
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
