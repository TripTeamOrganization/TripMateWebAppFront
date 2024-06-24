import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../../../models/restaurant.model';
import { TripmateApiService } from '../../../../services/tripmate-api.service';
import { NgForOf, NgIf } from '@angular/common';
import {SearchbarComponent} from "../../../../../public/shared/searchbar/searchbar.component";
import {MainFilterComponent} from "../../../../../public/shared/main-filter/main-filter.component";
import {CardgroupComponent} from "../../../../../public/shared/groups/cardgroup";
import {CardmainComponent} from "../../../../../public/shared/cardmain/cardmain.component";

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [
    SearchbarComponent, CardmainComponent, NgForOf, CardgroupComponent, NgIf, MainFilterComponent, SearchbarComponent, MainFilterComponent, CardgroupComponent, CardmainComponent
  ],
  templateUrl: './restaurants-component.component.html',
  styleUrl: './restaurants-component.component.scss'
})
export class RestaurantsComponentComponent implements OnInit {
  restaurants: Restaurant[] = [];
  restaurantData: Restaurant;
  filteredRestaurants: Restaurant[] = [];

  minLimit: number = 0;
  maxLimit: number = 9999;

  constructor(private ApiService: TripmateApiService) {
    this.restaurantData = {} as Restaurant;
  }

  ngOnInit() {
    this.getRestaurants();
  }

  getValues(event: { min: number, max: number }) {
    //console.log('minValue in restaurant:',  event.min);
    //console.log('maxValue in restaurant:',  event.max);

    this.minLimit = event.min;
    this.maxLimit = event.max;

    this.getRestaurants();
  }

  //Se utiliza en todas las páginas => compartido
  getPrice(mustTry:  String) {


    //funciones js a utilizar: split (string) , slice (array). length (string)
    let price: number = 0;


    // se separa un arreglo de dos:
    const resultSplit = mustTry.split(' ');


    //se tomar el valor final:
    let priceInString = resultSplit[1];

    //sólo e sla long de la cadena:
    let stringLength = priceInString.length;

    //se le quita el $ final
    let priceComplete = priceInString.slice(0, stringLength - 1);

    //console.log('length:', resultSplit[1].length - 1);
    // console.log('resultSplit-1-slice-price', priceInString.slice(0, stringLength - 1));

    //se convierte a number:
    price =  eval(priceComplete);
    //console.log('price in number:', price);

    return price;

  }

  getRestaurants() {
    this.ApiService.getRestaurants().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.restaurants = data.map(restaurant => new Restaurant(
            restaurant.id,
            restaurant.name,
            restaurant.imagePath,
            restaurant.locationCost,
            restaurant.mustTry
          ));
          this.filteredRestaurants = [];
          this.restaurants.forEach((value: Restaurant) => {

            const precio: number = this.getPrice(value.mustTry);
            if (precio >= this.minLimit && precio <= this.maxLimit)
            {
              this.filteredRestaurants.push(value);
            }

          });
        } else {
          console.error('El formato de datos recibido no es un array.');
        }
      },
      error => {
        console.error('Error al obtener datos de restaurantes:', error);
      }
    );
  }


  // Método para manejar la consulta de búsqueda por nombre
  searchHandler(searchQuery: string) {
    // Limpiamos los espacios iniciales y finales de la consulta
    const trimmedQuery = searchQuery.trim().toLowerCase();

    // Filtrar los restaurantes según el nombre que coincida con la consulta de búsqueda
    this.filteredRestaurants = this.restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(trimmedQuery)
    );

    // Puedes agregar un console.log aquí para verificar los resultados filtrados
    console.log('Restaurantes filtrados:', this.filteredRestaurants);
  }
}
