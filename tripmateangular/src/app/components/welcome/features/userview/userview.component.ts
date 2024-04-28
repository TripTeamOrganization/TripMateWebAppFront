import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-userview',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './userview.component.html',
  styleUrl: './userview.component.scss'
})
export class UserviewComponent {

}
