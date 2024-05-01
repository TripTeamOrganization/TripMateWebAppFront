import { Routes } from '@angular/router';
import { WelcomeComponent } from "./components/welcome/welcome.component";
import {
  AccomodationsComponentComponent
} from "./components/welcome/features/accomodations/components/accomodations-component.component";
import {
  ActivitiesComponentComponent
} from "./components/welcome/features/activities/activities-component.component";
import {
  RestaurantsComponentComponent
} from "./components/welcome/features/restaurants/restaurants-component.component";
import {FlightsComponentComponent} from "./components/welcome/features/flights/flights-component.component";
import { MyjourneysComponent } from './components/welcome/features/myjourneys/myjourneys.component';
import { ShoppingcartComponent } from './components/welcome/features/shoppingcart/shoppingcart.component';
import {SigninComponent} from "./components/welcome/features/signin/signin.component";
import {UserviewComponent} from "./components/welcome/features/userview/userview.component";
import {RegisterComponent} from "./components/welcome/features/register/register.component";
import {ReservationComponent} from "./components/welcome/features/reservation/reservation.component";
import {ItineraryComponent} from "./components/welcome/features/itinerary/itinerary.component";
import {PlansComponent} from "./components/welcome/features/plans/plans.component";
import { PaymentSuccesfullyComponent } from './components/welcome/features/payment-succesfully/payment-succesfully.component';
import { PaymentComponent} from "./components/welcome/features/payment/payment.component";
import {CrudAccomodationComponent} from "./components/welcome/cruds/components/crud-accomodation/crud-accomodation.component";
import {CrudFlightsComponent} from "./components/welcome/cruds/components/crud-flights/crud-flights.component";

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', redirectTo: 'accommodations', pathMatch: 'full' },
      { path: 'accommodations', component: AccomodationsComponentComponent },
      { path: 'activities', component: ActivitiesComponentComponent },
      { path: 'restaurants', component: RestaurantsComponentComponent },
      { path: 'flights', component: FlightsComponentComponent },
      { path: 'myjourneys', component: MyjourneysComponent},
      { path: 'shoppingcart', component: ShoppingcartComponent},
      { path: 'signin', component:SigninComponent},
      { path: 'userview',component:UserviewComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'reservation',component: ReservationComponent},
      { path: 'itinerary', component: ItineraryComponent},
      { path: 'suscription', component: PlansComponent},
      { path: 'payment', component: PaymentComponent},
      { path: 'payment-succesfully', component: PaymentSuccesfullyComponent},
      { path: 'admin/accommodationCrud', component: CrudAccomodationComponent },
      { path: 'admin/flightsCrud', component: CrudFlightsComponent }
    ]
  }
];


