import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface InputPassword {
  title: string;
  placeholder: string;

}
@Component({
  selector: 'app-password-imputs',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule],
  templateUrl: './password-imputs.component.html',
  styleUrl: './password-imputs.component.scss'
})
export class PasswordImputsComponent {
  @Input()
  inputData: InputPassword | undefined;
  @Input() value: any;
}
