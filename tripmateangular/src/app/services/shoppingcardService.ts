import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  getItems(): never[] {
    throw new Error('Method not implemented.');
  }
  carrito: any[] = [];



  agregarAlCarrito(item: any) {
    item.selected = false;
    this.carrito.push(item);
  }
  estaEnCarrito(item: any): boolean {
    return this.carrito.some(cartItem => cartItem.title === item.title);
  }
  eliminarDelCarrito(index: number) {
    if (index >= 0 && index < this.carrito.length) {
      this.carrito.splice(index, 1);
    }
  }
  obtenerCarrito(): any[] {
    return this.carrito;
  }
}
