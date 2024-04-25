import {Component, OnInit} from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { SearchbarComponent } from "../shared/searchbar/searchbar.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {Activity} from "../../../../models/activity.interface";
import {AllapisService} from "../shared/services/allapis.service";
import {CardgroupComponent} from "../shared/groups/cardgroup";
import {CardmainComponent} from "../shared/cardmain/cardmain.component";
import {NgForOf, NgIf} from "@angular/common";

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
    NgIf
  ],
  templateUrl: './activities-component.component.html',
  styleUrl: './activities-component.component.scss'
})
export class ActivitiesComponentComponent implements OnInit {
  activities: Activity[] = [];
  activityData: Activity;
  constructor(private apiservice: AllapisService) {
    this.activityData = {} as Activity;
  }

  ngOnInit() {
    this.getActivities();
  }

  getActivities() {
    this.apiservice.getActivities().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.activities = data.map(activity => new Activity(
            activity.nombre,
            activity.imagen,
            activity.descripcion,
            activity.ubicacion
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
}
