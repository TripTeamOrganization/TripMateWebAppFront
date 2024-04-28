import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {AllapisService} from "../shared/services/allapis.service";
import {CardgroupComponent} from "../shared/groups/cardgroup";
import {CardmainComponent} from "../shared/cardmain/cardmain.component";
import {NgForOf, NgIf} from "@angular/common";
import {MyJourneys} from "../../../../models/myjourneys.interface";

@Component({
  selector: 'app-myjourneys',
  standalone: true,
  imports: [RouterLink,
    RouterOutlet,
    HttpClientModule,
    CardgroupComponent,
    CardmainComponent,
    NgForOf,
    NgIf],
  templateUrl: './myjourneys.component.html',
  styleUrl: './myjourneys.component.scss'
})
export class MyjourneysComponent implements OnInit{
  myjourneys: MyJourneys[] = [];
  myjourneysData: MyJourneys;
  constructor(private apiservice: AllapisService) {
    this.myjourneysData = {} as MyJourneys;
  }
  ngOnInit(): void {
    this.getMyJourneys();
  }
  getMyJourneys() {
    this.apiservice.getActivities().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.myjourneys = data.map(myjourneys => new MyJourneys(
            myjourneys.nombre,
            myjourneys.imagen,
          ));
        } else {
          console.error('El formato de datos recibido no es un array.');
        }
      },
      error => {
        console.error('Error al obtener datos de mis viajes:', error);
      }
    );
  }
}
