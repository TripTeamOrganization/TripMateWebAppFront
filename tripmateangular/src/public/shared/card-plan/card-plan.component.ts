import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {SearchbarComponent} from "../searchbar/searchbar.component";

@Component({
  selector: 'app-card-plan',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, SearchbarComponent],
  templateUrl: './card-plan.component.html',
  styleUrl: './card-plan.component.scss'
})
export class CardPlanComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() price: string = '';
  @Input() features: number = 0;
  @Input() feature1: string = '';
  @Input() feature2: string = '';
  @Input() feature3: string = '';
  @Output() onSelectPlan = new EventEmitter<void>();

  onButtonClick() {
    this.onSelectPlan.emit();
  }
}
