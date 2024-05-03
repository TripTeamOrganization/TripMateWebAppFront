import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf} from "@angular/common";
import {MatCardActions} from "@angular/material/card";
import {Router} from "@angular/router";


@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [

    MatTab,
    MatTabGroup,
    RouterLink,
    RouterLinkActive,
    NgForOf,
    MatCardActions,

  ],

  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.scss'
})
export class ItineraryComponent {

  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  selectedDay: number | null = null;
  constructor(private router: Router) {
  }

  selectDay(index: number) {
    this.selectedDay = index;
  }
  vistaMain(){
    this.router.navigateByUrl('/accommodations')
  }
}
