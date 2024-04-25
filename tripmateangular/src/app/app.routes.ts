import { Routes } from '@angular/router';
import { WelcomeComponent } from "./components/welcome/welcome.component";
import {
  AccomodationsComponentComponent
} from "./components/welcome/features/accomodations/accomodations-component.component";
import {
  ActivitiesComponentComponent
} from "./components/welcome/features/activities/activities-component.component";
import {
  RestaurantsComponentComponent
} from "./components/welcome/features/restaurants/restaurants-component.component";
import {FlightsComponentComponent} from "./components/welcome/features/flights/flights-component.component";
import { JourneysComponentComponent } from './components/welcome/features/journeys/journeys-component/journeys-component.component';
import { MyjourneysComponent } from './components/welcome/features/myjourneys/myjourneys.component';
import { ShoppingcartComponent } from './components/welcome/features/shoppingcart/shoppingcart.component';
export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'prefix',
    children: [
      { path: 'accommodations', component: AccomodationsComponentComponent },
      { path: 'activities', component: ActivitiesComponentComponent },
      { path: 'restaurants', component: RestaurantsComponentComponent },
      { path: 'flights', component: FlightsComponentComponent },
      { path: 'journeys', component: JourneysComponentComponent},
      { path: 'myjourneys', component: MyjourneysComponent},
      { path: 'shoppingcart', component: ShoppingcartComponent}
    ]
  }
];

