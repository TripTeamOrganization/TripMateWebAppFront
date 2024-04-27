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
}
