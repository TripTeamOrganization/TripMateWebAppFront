import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-placeholder-card',
  standalone: true,
  imports: [],
  templateUrl: './placeholder-card.component.html',
  styleUrl: './placeholder-card.component.scss'
})
export class PlaceholderCardComponent {
  @Input() minMax: string = '';
  @Input() value: number = 0.00;
}
