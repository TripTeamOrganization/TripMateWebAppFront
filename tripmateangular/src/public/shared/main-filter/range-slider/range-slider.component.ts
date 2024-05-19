import { Component, Output, EventEmitter } from '@angular/core';
import { MatSlider, MatSliderRangeThumb } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-range-slider',
  standalone: true,
  imports: [
    MatSlider,
    MatSliderRangeThumb,
    FormsModule,
  ],
  templateUrl: './range-slider.component.html',
  styleUrl: './range-slider.component.scss',
})
export class RangeSliderComponent {
  minValue = 0;
  maxValue = 999;

  @Output() valuesChanged = new EventEmitter<{ min: number, max: number }>();

  onValueChange() {
    console.log('minValue in slider:',  this.minValue);
    console.log('maxValue in slider:',  this.maxValue);

    this.valuesChanged.emit({ min: this.minValue, max: this.maxValue });
    //{ minimo: th ,  maximo: }
  }
}
