import {Component, OnInit} from '@angular/core';
import {SearchbarComponent} from "../shared/searchbar/searchbar.component";
import {CardmainComponent} from "../shared/cardmain/cardmain.component";
import {CardgroupComponent} from "../shared/groups/cardgroup";
import {Accommodation} from "../../../../models/accomodation.interface";
import {AllapisService} from "../shared/services/allapis.service";
import {Restaurant} from "../../../../models/restaurant.interface";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-accomodations',
  standalone: true,
  imports: [
    SearchbarComponent,
    CardmainComponent,
    CardgroupComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './accomodations-component.component.html',
  styleUrl: './accomodations-component.component.scss'
})
export class AccomodationsComponentComponent implements OnInit {
  accomodationData: Accommodation;
  accomodations: Accommodation[] = [];

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
          this.accomodations = [];
          data.forEach((accommodation) => {
            const newAccommodation = new Accommodation(
              accommodation.nombre,
              accommodation.puntuacion,
              accommodation.imagen,
              accommodation.descripcion,
              accommodation.precio,
              accommodation.direccion,
              accommodation.telefono,
              accommodation.sitioWeb
            );
            this.accomodations.push(newAccommodation);
            console.log(this.accomodations);
          });
        } else {
          console.error('El formato de datos recibido no es un array.');
        }
        console.log(this.accomodations);
      }
    );
  }


}
