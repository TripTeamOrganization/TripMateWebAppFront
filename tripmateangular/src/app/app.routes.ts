import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AccomodationsComponentComponent } from './components/welcome/features/accomodations/components/accomodations-component.component';
import { ActivitiesComponentComponent } from './components/welcome/features/activities/activities-component.component';
import { RestaurantsComponentComponent } from './components/welcome/features/restaurants/restaurants-component.component';
import { FlightsComponentComponent } from './components/welcome/features/flights/flights-component.component';
import { MyjourneysComponent } from './components/welcome/features/myjourneys/myjourneys.component';
import { ShoppingcartComponent } from './components/welcome/features/shoppingcart/shoppingcart.component';
import { SigninComponent } from './components/welcome/features/signin/signin.component';
import { UserviewComponent } from './components/welcome/features/userview/userview.component';
import { RegisterComponent } from './components/welcome/features/register/register.component';
import { ReservationComponent } from './components/welcome/features/reservation/reservation.component';
import { ItineraryComponent } from './components/welcome/features/itinerary/itinerary.component';
import { PlansComponent } from './components/welcome/features/plans/plans.component';
import { PaymentSuccesfullyComponent } from './components/welcome/features/payment-succesfully/payment-succesfully.component';
import {PaymentComponent} from "./components/welcome/features/payment/payment.component";
import {ForgotPasswordComponent} from "./components/welcome/features/forgotpassword/forgotpassword.component";
import {
  CrudAccomodationComponent
} from "./components/welcome/cruds/components/crud-accomodation/crud-accomodation.component";
import {CrudFlightsComponent} from "./components/welcome/cruds/components/crud-flights/crud-flights.component";
import {CrudActivitiesComponent} from "./components/welcome/cruds/components/crud-activities/crud-activities.component";
import {CrudRestaurantComponent} from "./components/welcome/cruds/components/crud-restaurant/crud-restaurant.component";
import {ChangeEmailComponent} from "./components/welcome/features/change-email/change-email.component";
import {AuthenticatedGuard} from "../core/auth.guard";
import {AuthGuard} from "../core/authentication.guard";


export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      { path: '', redirectTo: 'accommodations', pathMatch: 'full'},
      { path: 'accommodations', component: AccomodationsComponentComponent, canActivate: [AuthGuard] },
      { path: 'activities', component: ActivitiesComponentComponent, canActivate: [AuthGuard] },
      { path: 'restaurants', component: RestaurantsComponentComponent, canActivate: [AuthGuard] },
      { path: 'flights', component: FlightsComponentComponent, canActivate: [AuthGuard] },
      { path: 'myjourneys', component: MyjourneysComponent, canActivate: [AuthGuard] },
      { path: 'shoppingcart', component: ShoppingcartComponent, canActivate: [AuthGuard] },
      { path: 'signin', component: SigninComponent, canActivate: [AuthenticatedGuard] },
      { path: 'userview', component: UserviewComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [AuthenticatedGuard] },
      { path: 'reservation', component: ReservationComponent, canActivate: [AuthGuard] },
      { path: 'itinerary', component: ItineraryComponent, canActivate: [AuthGuard] },
      { path: 'suscription', component: PlansComponent, canActivate: [AuthGuard] },
      { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
      { path: 'payment-succesfully', component: PaymentSuccesfullyComponent, canActivate: [AuthGuard] },
      { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthGuard] },
      { path: 'admin/accommodationCrud', component: CrudAccomodationComponent, canActivate: [AuthGuard] },
      { path: 'admin/flightsCrud', component: CrudFlightsComponent, canActivate: [AuthGuard] },
      { path: 'admin/activitiesCrud', component: CrudActivitiesComponent, canActivate: [AuthGuard] },
      { path: 'admin/restaurantsCrud', component: CrudRestaurantComponent, canActivate: [AuthGuard] },
      { path: 'change-email', component: ChangeEmailComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
