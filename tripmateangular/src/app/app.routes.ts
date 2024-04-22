import { Routes } from '@angular/router';
import {
  AccomodationsComponentComponent
} from "./components/features/accomodations-component/accomodations-component.component";
import {ActivitiesComponentComponent} from "./components/features/activities-component/activities-component.component";
import {
  RestaurantsComponentComponent
} from "./components/features/restaurants-component/restaurants-component.component";
import {FlightsComponentComponent} from "./components/features/flights-component/flights-component.component";

export const routes: Routes = [
  { path: 'accommodations', component: AccomodationsComponentComponent },
  { path: 'activities', component: ActivitiesComponentComponent },
  { path: 'restaurants', component: RestaurantsComponentComponent },
  { path: 'flights', component: FlightsComponentComponent },
];
