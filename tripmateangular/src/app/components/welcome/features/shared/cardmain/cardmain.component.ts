import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";
import {MatCard} from "@angular/material/card";
import {StarsvgComponent} from "./starsvg/starsvg.component";
import {ShoppingCartService} from "../services/shoppingcardService";

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
  constructor(private shoppingCartService: ShoppingCartService) {}
  getStarIndices(starcount: string): number[] {
    const count: number = parseInt(starcount, 10);
    return Array.from({ length: count }, (_, i) => i);
  }
  GuardarEnCarrito() {
    const item = {
      title: this.title,
      descripcion: this.descripcion,
      sourceimage: this.sourceimage,
      ubicacion: this.ubicacion,
      price: this.price,
      starcount: this.starcount
    };
    console.log('Elemento agregado al carrito:', item);
    this.shoppingCartService.agregarAlCarrito(item);
  }
}

