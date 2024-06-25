import {Component, OnInit} from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {Activity} from "../../../../models/activity.model";
import {TripmateApiService} from "../../../../services/tripmate-api.service";
import {NgForOf, NgIf} from "@angular/common";
import {MainFilterComponent} from "../../../../../public/shared/main-filter/main-filter.component";
import {SearchbarComponent} from "../../../../../public/shared/searchbar/searchbar.component";
import {CardmainComponent} from "../../../../../public/shared/cardmain/cardmain.component";
import {CardgroupComponent} from "../../../../../public/shared/groups/cardgroup";

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    SearchbarComponent,
    HttpClientModule,
    CardgroupComponent,
    CardmainComponent,
    NgForOf,
    NgIf,
    MainFilterComponent,
    MainFilterComponent,
    SearchbarComponent,
    CardmainComponent,
    CardgroupComponent
  ],
  templateUrl: './activities-component.component.html',
  styleUrl: './activities-component.component.scss'
})
export class ActivitiesComponentComponent implements OnInit {
  activities: Activity[] = [];
  activityData: Activity;
  filteredActivities: Activity[] = [];

  minLimit: number = 0;
  maxLimit: number = 999;

  constructor(private apiservice: TripmateApiService) {
    this.activityData = {} as Activity;
  }

  ngOnInit() {
    this.getActivities();
  }

  getValues(event: { min: number, max: number }) {
    //console.log('minValue in actividades:',  event.min);
    //console.log('maxValue in actividades:',  event.max);

    this.minLimit = event.min;
    this.maxLimit = event.max;

    this.getActivities();
  }
  getPrice(mustTry: String): number {

    let price: number = 0;

    //$5 por persona
    // se separa un arreglo de dos:
    const resultSplit = mustTry.split(' ');

    let priceInString = resultSplit[0];

    //sólo es la long de la cadena:
    let stringLength = priceInString.length;

    //se le quita el $ inicial
    let priceComplete = priceInString.slice(1);

    //console.log('length:', resultSplit[1].length - 1);
    // console.log('resultSplit-1-slice-price', priceInString.slice(0, stringLength - 1));

    //se convierte a number:
    price =  eval(priceComplete);
    //console.log('price in number:', price);

    return price;
  }

  getActivities() {
    this.apiservice.getActivities().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.activities = data.map(activity => new Activity(
            activity.id,
            activity.name,
            activity.imagePath,
            activity.description,
            activity.location,
            activity.price

          ));
          this.filteredActivities = [];
          this.activities.forEach((value: Activity) => {

            const precio: number = this.getPrice(value.price);
            if (precio >= this.minLimit && precio <= this.maxLimit)
            {
              this.filteredActivities.push(value);
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

  searchHandler(searchQuery: string) {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    this.filteredActivities = this.activities.filter(activity =>
      activity.name.toLowerCase().includes(trimmedQuery)
    );
    // Puedes agregar un console.log aquí para verificar los resultados filtrados
    console.log('Actividades filtrados:', this.filteredActivities);
  }

}
