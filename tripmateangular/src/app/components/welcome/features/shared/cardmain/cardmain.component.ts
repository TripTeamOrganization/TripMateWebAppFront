import {Component, Input} from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";
import {MatCard} from "@angular/material/card";
import {of} from "rxjs";
import {StarsvgComponent} from "./starsvg/starsvg.component";

@Component({
  selector: 'app-cardmain',
  standalone: true,
  imports: [
    NgStyle,
    MatCard,
    NgClass,
    StarsvgComponent
  ],
  templateUrl: './cardmain.component.html',
  styleUrl: './cardmain.component.scss'
})
export class CardmainComponent {
  @Input() maxWidth: number = 100;
  @Input() title: string = '';
  @Input() descripcion: string = '';
  @Input() buttontext: string = '';
  @Input() sourceimage: string = '';
  @Input() ubicacion: string = '';
  @Input() price: string = '';
  @Input() starcount: string ='0';
  @Input() maxHeight: number =30;

  getStarIndices(starcount: string): number[] {
    const count: number = parseInt(starcount, 10);
    return Array.from({ length: count }, (_, i) => i);
  }
}
