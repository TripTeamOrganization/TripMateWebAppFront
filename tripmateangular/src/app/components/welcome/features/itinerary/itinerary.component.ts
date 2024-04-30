import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [

    MatTab,
    MatTabGroup,
    RouterLink,
    RouterLinkActive,
    NgForOf,

  ],

  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.scss'
})
export class ItineraryComponent {

  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  selectedDay: number | null = null;

  selectDay(index: number) {
    this.selectedDay = index;
  }
}
