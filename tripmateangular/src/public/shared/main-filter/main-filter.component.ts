import { Component, Input } from '@angular/core';
import {RangeSliderComponent} from "./range-slider/range-slider.component";
import {DropdownCardComponent} from "./dropdown-card/dropdown-card.component";
import {PlaceholderCardComponent} from "./placeholder-card/placeholder-card.component";

@Component({
  selector: 'app-main-filter',
  standalone: true,
  imports: [RangeSliderComponent, DropdownCardComponent, PlaceholderCardComponent],
  templateUrl: './main-filter.component.html',
  styleUrl: './main-filter.component.scss'
})

export class MainFilterComponent {
  @Input() title: string = '';
  @Input() filterTitle: string = '';
  @Input() filter1: string = '';
  @Input() filter2: string = '';
  @Input() filter3: string = '';
  @Input() filter4: string = '';
  @Input() filter5: string = '';

  minValue: number = 0;
  maxValue: number = 9999;
  @Input() callback!: (min: number, max: number) => void;

  updateValues(event: { min: number, max: number }) {
    this.minValue = event.min;
    this.maxValue = event.max;
    this.callback(this.minValue, this.maxValue);
  }



}
