import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {SearchbarComponent} from "../shared/searchbar/searchbar.component";

@Component({
  selector: 'app-activities',
  standalone: true,
    imports: [
        RouterLink,
        RouterOutlet,
        SearchbarComponent
    ],
  templateUrl: './activities-component.component.html',
  styleUrl: './activities-component.component.scss'
})
export class ActivitiesComponentComponent {

}
