import {Component, Input} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-dropdown-card',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './dropdown-card.component.html',
  styleUrl: './dropdown-card.component.scss'
})
export class DropdownCardComponent {
  @Input() title: string = '';
  @Input() option1: string = '';
  @Input() option2: string = '';
  @Input() option3: string = '';
  @Input() option4: string = '';
  @Input() option5: string = '';
  selected: any;
}
