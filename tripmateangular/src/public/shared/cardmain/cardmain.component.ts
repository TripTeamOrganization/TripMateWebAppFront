import {Component, EventEmitter, Input, Output, HostListener, OnInit} from '@angular/core';
import { NgClass, NgStyle } from "@angular/common";
import { MatCard } from "@angular/material/card";
import { StarsvgComponent } from "./starsvg/starsvg.component";
import { ShoppingCartService } from "../../../app/services/shoppingcardService";

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
  styleUrls: ['./cardmain.component.scss']
})
export class CardmainComponent implements OnInit{
  @Input() maxWidth: number = 100;
  @Input() title: string = '';
  @Input() descripcion: string = '';
  @Input() buttontext: string = '';
  @Input() sourceimage: string = '';
  @Input() ubicacion: string = '';
  @Input() price: string = '';
  @Input() starcount: string = '0';
  @Input() maxHeight: number = 100;

  isMobileView = false;
  constructor(private shoppingCartService: ShoppingCartService) {}
  ngOnInit() {
    this.checkWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.isMobileView = this.getWindowWidth() <= 768;
  }

  getWindowWidth(): number {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }
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
    console.log('Elemento agregado al carrito :):', item);
    this.shoppingCartService.agregarAlCarrito(item);
  }
}

