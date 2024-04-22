import { Component } from '@angular/core';
import {SearchbarComponent} from "../shared/searchbar/searchbar.component";

@Component({
  selector: 'app-flights',
  standalone: true,
    imports: [
        SearchbarComponent
    ],
  templateUrl: './flights-component.component.html',
  styleUrl: './flights-component.component.scss'
})
export class FlightsComponentComponent {

}
