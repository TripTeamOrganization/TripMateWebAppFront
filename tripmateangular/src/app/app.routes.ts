import { Routes } from '@angular/router';
import { WelcomeComponent } from "./components/welcome/welcome.component";
import {
  AccomodationsComponentComponent
} from "./components/welcome/features/accomodations-component/accomodations-component.component";
import {
  ActivitiesComponentComponent
} from "./components/welcome/features/activities-component/activities-component.component";
import {
  RestaurantsComponentComponent
} from "./components/welcome/features/restaurants-component/restaurants-component.component";
import {FlightsComponentComponent} from "./components/welcome/features/flights-component/flights-component.component";
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    children: [
      {
        path: 'features',
        children: [
          {
            path: 'accommodations',
            component: AccomodationsComponentComponent,
          },
          {
            path: 'activities',
            component: ActivitiesComponentComponent,
          },
          {
            path: 'restaurants',
            component: RestaurantsComponentComponent,
          },
          {
            path: 'flights-component',
            component: FlightsComponentComponent,
          }
        ]
      },
    ]
  },
];

