import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface InputInfo {
  title: string;
  placeholder: string;

}
@Component({
  selector: 'app-imputs',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule],
  templateUrl: './imputs.component.html',
  styleUrl: './imputs.component.scss'
})
export class ImputsComponent {
  @Input()
  inputData: InputInfo | undefined;
  @Input()
  placeholder: string="Escriba aquí su placeholder";
}
