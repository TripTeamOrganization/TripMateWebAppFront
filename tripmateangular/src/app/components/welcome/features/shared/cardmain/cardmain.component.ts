import {Component, Input} from '@angular/core';
import {NgStyle} from "@angular/common";
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-cardmain',
  standalone: true,
  imports: [
    NgStyle,
    MatCard
  ],
  templateUrl: './cardmain.component.html',
  styleUrl: './cardmain.component.scss'
})
export class CardmainComponent {
  @Input() maxWidth: number = 100;
  @Input() title: string = '';
  @Input() descripcion: string = '';

}
