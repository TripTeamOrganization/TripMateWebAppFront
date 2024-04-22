import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-activities-component',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './activities-component.component.html',
  styleUrl: './activities-component.component.scss'
})
export class ActivitiesComponentComponent {

}
