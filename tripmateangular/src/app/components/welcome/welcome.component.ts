import { Component } from '@angular/core';
import { MainContainerComponent } from "../layout/";
import { RouterModule } from "@angular/router";
import {FlightsComponentComponent} from "./features/flights/flights-component.component";
import {RestaurantsComponentComponent} from "./features/restaurants/restaurants-component.component";
import {ActivitiesComponentComponent} from "./features/activities/activities-component.component";
import {AccomodationsComponentComponent} from "./features/accomodations/accomodations-component.component";





@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    MainContainerComponent,
    FlightsComponentComponent,
    RestaurantsComponentComponent,
    ActivitiesComponentComponent,
    AccomodationsComponentComponent,
    RouterModule
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor() {
  }
}
