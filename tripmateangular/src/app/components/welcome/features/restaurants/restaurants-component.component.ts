import { Component, OnInit } from '@angular/core';
import {SearchbarComponent} from "../shared/searchbar/searchbar.component";
import {CardmainComponent} from "../shared/cardmain/cardmain.component";
import {Restaurant} from "../../../../models/restaurant.interface";
import {AllapisService} from "../shared/services/allapis.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [
    SearchbarComponent, CardmainComponent, NgForOf
  ],
  templateUrl: './restaurants-component.component.html',
  styleUrl: './restaurants-component.component.scss'
})
export class RestaurantsComponentComponent implements OnInit {
  restaurantData: Restaurant;
  restaurants: Restaurant[] = [];

  constructor(private ApiService: AllapisService) {
    this.restaurantData = {} as Restaurant;
  }

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants() {
    this.ApiService.getRestaurants().subscribe((data: any) => {
      if (Array.isArray(data)) {
        this.restaurants = [];
        data.forEach((restaurant) => {
          const newRestaurant = new Restaurant(
            restaurant.nombre,
            restaurant.imagen,
            restaurant.descripcion,
            restaurant.locationCost,
            restaurant.cuisines,
            restaurant.mustTry,
            restaurant.openingHours
          );
          this.restaurants.push(newRestaurant);
        });
      } else {
        console.error('El formato de datos recibido no es un array.');
      }
      console.log(this.restaurants);
    });
  }
}
