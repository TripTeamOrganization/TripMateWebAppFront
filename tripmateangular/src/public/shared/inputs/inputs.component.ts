import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface InputInfo {
  title: string;
  placeholder: string;

}
@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss'
})
export class InputsComponent {
  @Input()
  inputData: InputInfo | undefined;
  @Input()
  placeholder: string="Escriba aquí su placeholder";
}
