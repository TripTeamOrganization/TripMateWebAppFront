import {Component} from '@angular/core';
import {SearchbarComponent} from "../shared/searchbar/searchbar.component";

@Component({
  selector: 'app-accomodations',
  standalone: true,
  imports: [
    SearchbarComponent
  ],
  templateUrl: './accomodations-component.component.html',
  styleUrl: './accomodations-component.component.scss'
})
export class AccomodationsComponentComponent {

}
