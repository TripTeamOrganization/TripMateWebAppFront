import { Component } from '@angular/core';
import {SearchbarComponent} from "../shared/searchbar/searchbar.component";

@Component({
  selector: 'app-restaurants',
  standalone: true,
    imports: [
        SearchbarComponent
    ],
  templateUrl: './restaurants-component.component.html',
  styleUrl: './restaurants-component.component.scss'
})
export class RestaurantsComponentComponent {

}
