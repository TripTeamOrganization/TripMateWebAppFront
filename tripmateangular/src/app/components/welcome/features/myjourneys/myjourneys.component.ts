import { Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Router} from "@angular/router";
import {TripmateApiService} from "../../../../services/tripmate-api.service";
import {User} from "../../../../models/user.model";

@Component({
  selector: 'app-myjourneys',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './myjourneys.component.html',
  styleUrl: './myjourneys.component.scss'
})
export class MyjourneysComponent {
  constructor(private router: Router) {
  }
  vistaItinerary(){
    this.router.navigateByUrl('/itinerary')
  }
}
