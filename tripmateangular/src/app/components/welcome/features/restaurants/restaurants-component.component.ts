import { Component, OnInit } from '@angular/core';
import { SearchbarComponent } from '../shared/searchbar/searchbar.component';
import { CardmainComponent } from '../shared/cardmain/cardmain.component';
import { Restaurant } from '../../../../models/restaurant.interface';
import { AllapisService } from '../shared/services/allapis.service';
import { NgForOf, NgIf } from '@angular/common';
import { CardgroupComponent } from '../shared/groups/cardgroup';
import {MainFilterComponent} from "../shared/main-filter/main-filter.component";

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [
    SearchbarComponent, CardmainComponent, NgForOf, CardgroupComponent, NgIf, MainFilterComponent
  ],
  templateUrl: './restaurants-component.component.html',
  styleUrl: './restaurants-component.component.scss'
})
export class RestaurantsComponentComponent implements OnInit {
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];

  constructor(private ApiService: AllapisService) {}

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants() {
    this.ApiService.getRestaurants().subscribe((data: Restaurant[]) => {
      if (Array.isArray(data)) {
        this.restaurants = [];
        this.filteredRestaurants = [];
        data.slice(0, -2).forEach((restaurant) => {
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
          this.filteredRestaurants.push(newRestaurant);
        });
      } else {
        console.error('El formato de datos recibido no es un array.');
      }
      console.log(this.restaurants);
    });
  }


  // Método para manejar la consulta de búsqueda por nombre
  searchHandler(searchQuery: string) {
    // Limpiamos los espacios iniciales y finales de la consulta
    const trimmedQuery = searchQuery.trim().toLowerCase();

    // Filtrar los restaurantes según el nombre que coincida con la consulta de búsqueda
    this.filteredRestaurants = this.restaurants.filter(restaurant =>
      restaurant.nombre.toLowerCase().includes(trimmedQuery)
    );

    // Puedes agregar un console.log aquí para verificar los resultados filtrados
    console.log('Restaurantes filtrados:', this.filteredRestaurants);
  }
}
