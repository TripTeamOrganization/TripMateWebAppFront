import { Component, EventEmitter, Input, Output } from '@angular/core';
import {RangeSliderComponent} from "./range-slider/range-slider.component";
import {DropdownCardComponent} from "./dropdown-card/dropdown-card.component";
import {PlaceholderCardComponent} from "./placeholder-card/placeholder-card.component";
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-main-filter',
  standalone: true,
  imports: [RangeSliderComponent, DropdownCardComponent, PlaceholderCardComponent, SearchbarComponent],
  templateUrl: './main-filter.component.html',
  styleUrl: './main-filter.component.scss'
})

export class MainFilterComponent {
  @Input() title: string = '';

  minValue: number = 0;
  maxValue: number = 999;

  @Output() valuesChangedInFilter = new EventEmitter<{ min: number, max: number }>();

  updateValues(event: { min: number, max: number }) {
    this.minValue = event.min;
    this.maxValue = event.max;

    console.log('minValue in filter:',  this.minValue);
    console.log('maxValue in filter:',  this.maxValue);

    //volver a emitr los valores de min y max al padre.
    this.valuesChangedInFilter.emit({ min: this.minValue, max: this.maxValue });
  }
}
