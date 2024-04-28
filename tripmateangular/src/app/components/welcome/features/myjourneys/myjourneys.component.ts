import { Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-myjourneys',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './myjourneys.component.html',
  styleUrl: './myjourneys.component.scss'
})
export class MyjourneysComponent {
}
