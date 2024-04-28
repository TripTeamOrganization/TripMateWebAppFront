import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  carrito: any[] = [];

  agregarAlCarrito(item: any) {
    this.carrito.push(item);
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
