  import { Component } from '@angular/core';
  import {RouterLink, RouterOutlet} from "@angular/router";
  import {SearchbarComponent} from "../shared/searchbar/searchbar.component";
  import {HttpClient} from "@angular/common/http";

  @Component({
    selector: 'app-activities',
    standalone: true,
      imports: [
          RouterLink,
          RouterOutlet,
          SearchbarComponent
      ],
    templateUrl: './activities-component.component.html',
    styleUrl: './activities-component.component.scss'
  })
  export class ActivitiesComponentComponent {
    constructor(private http: HttpClient) { }

    consultarAPI() {
      this.http.get<any>('http://localhost:3000/alojamientos').subscribe(data => {
        console.log(data);
      }, error => {
        console.error('Error al llamar a la API:', error);
      });
    }


  }
