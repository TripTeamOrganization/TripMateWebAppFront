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
  filteredRestaurants: Restaurant[] = [];

  minLimit: number = 0;
  maxLimit: number = 9999;

  constructor(private ApiService: TripmateApiService) {}

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
    this.ApiService.getRestaurants().subscribe((data: Restaurant[]) => {
      if (Array.isArray(data)) {
        this.restaurants = [];
        this.filteredRestaurants = [];
        data.slice(0, -2).forEach((restaurant) => {
          const newRestaurant = new Restaurant(
            restaurant.id,
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

      //filtrar con los valores mín y max:
      console.log('filtrados:', this.filteredRestaurants);

      this.filteredRestaurants = [];
      this.restaurants.forEach((value: Restaurant) => {

        //eval = evaluar INTEGER => STRING.
        console.log('mustTry  in integer', value.mustTry);
        //console.log('mustTry  in integer', eval(value.id));
        //const precio = eval(value.id);
        const precio = this.getPrice(value.mustTry);

        if (precio >= this.minLimit && precio <= this.maxLimit)
        {
          this.filteredRestaurants.push(value);
        }
      });

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
