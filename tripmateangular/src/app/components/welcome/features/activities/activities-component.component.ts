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
    //console.log('minValue in restaurant:',  event.min);
    //console.log('maxValue in restaurant:',  event.max);

    this.minLimit = event.min;
    this.maxLimit = event.max;

    this.getActivities();
  }

  getActivities() {
    this.apiservice.getActivities().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.activities = [];
        this.filteredActivities = [];
          this.activities = data.map(activity => new Activity(
            activity.id,
            activity.nombre,
            activity.imagen,
            activity.descripcion,
            activity.ubicacion,
            activity.precio
            //this.activities.push(newActivity);
          //this.filteredActivities.push(newActivity);
          ));
        } else {
          console.error('El formato de datos recibido no es un array.');
        }
      },
      error => {
        console.error('Error al obtener datos de actividades:', error);
      }
    );
    //filtrar con los valores mín y max:
    console.log('filtrados:', this.filteredActivities);

    this.filteredActivities = [];
    this.activities.forEach((value: Activity) => {
        console.log('id in integer', eval(value.id));
       const precio = eval(value.id);

       if (precio >= this.minLimit && precio <= this.maxLimit)
       {
          this.filteredActivities.push(value);
       }
    });

    console.log(this.activities);
  }

  searchHandler(searchQuery: string) {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    this.filteredActivities = this.activities.filter(activity =>
      activity.nombre.toLowerCase().includes(trimmedQuery)
    );
    // Puedes agregar un console.log aquí para verificar los resultados filtrados
    console.log('Actividades filtrados:', this.filteredActivities);
  }

}
