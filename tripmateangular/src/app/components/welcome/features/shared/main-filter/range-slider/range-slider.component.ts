import { Component } from '@angular/core';
import {MatSlider, MatSliderRangeThumb} from "@angular/material/slider";

@Component({
  selector: 'app-range-slider',
  standalone: true,
  imports: [
    MatSlider,
    MatSliderRangeThumb
  ],
  templateUrl: './range-slider.component.html',
  styleUrl: './range-slider.component.scss'
})
export class RangeSliderComponent {
}
