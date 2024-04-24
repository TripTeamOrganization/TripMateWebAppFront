import {Component} from '@angular/core';
import {SearchbarComponent} from "../shared/searchbar/searchbar.component";
import {CardmainComponent} from "../shared/cardmain/cardmain.component";

@Component({
  selector: 'app-accomodations',
  standalone: true,
  imports: [
    SearchbarComponent,
    CardmainComponent
  ],
  templateUrl: './accomodations-component.component.html',
  styleUrl: './accomodations-component.component.scss'
})
export class AccomodationsComponentComponent {

}
