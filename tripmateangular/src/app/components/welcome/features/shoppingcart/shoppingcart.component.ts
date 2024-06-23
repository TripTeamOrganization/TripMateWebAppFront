import {Component, OnInit} from '@angular/core';
import {CardgroupComponent} from "../../../../../public/shared/groups/cardgroup";
import {ShoppingCartService} from "../../../../services/shoppingcardService";
import {CardShopcarComponent} from "../../../../../public/shared/card-shopcar/card-shopcar.component";
import {ReservationsService} from "../../../../services/reservationsService.service";
import {MatTab} from "@angular/material/tabs";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [CardgroupComponent, CardShopcarComponent, MatTab, RouterLink, RouterLinkActive],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.scss'
})
export class ShoppingcartComponent implements OnInit{
  items: any[] = [];
  selectedItems: any[] = [];
  constructor(private shoppingCartService: ShoppingCartService, private reservationService: ReservationsService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.items = this.shoppingCartService.obtenerCarrito();
    console.log(this.items);
  }
  ReservaSeleccionado() {
    this.selectedItems = this.shoppingCartService.carrito.filter(item => item.selected && !item.reservado && !this.reservationService.estaReservado(item));
    if (this.selectedItems.length > 0) {
      this.selectedItems.forEach(item => {
        item.reservado = true;
        this.reservationService.agregarAReserva(item);
      });
    }
  }
  ReservarTodo() {
    this.items = this.shoppingCartService.obtenerCarrito();
    for (let item of this.items) {
      if (!item.reservado && !this.reservationService.estaReservado(item)){
        item.reservado = true;
        this.reservationService.agregarAReserva(item);
      }
    }
  }
}
