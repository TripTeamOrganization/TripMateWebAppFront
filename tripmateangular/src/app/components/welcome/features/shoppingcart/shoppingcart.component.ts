import {Component, OnInit} from '@angular/core';
import {CardgroupComponent} from "../../../../../public/shared/groups/cardgroup";
import {ShoppingCartService} from "../../../../services/shoppingcardService";
import {CardShopcarComponent} from "../../../../../public/shared/card-shopcar/card-shopcar.component";
import {ReservationsService} from "../../../../services/reservationsService.service";
import {MatTab} from "@angular/material/tabs";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [CardgroupComponent, CardShopcarComponent, MatTab, RouterLink, RouterLinkActive],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.scss'
})
export class ShoppingcartComponent implements OnInit{
  items: any[] = [];
  constructor(private shoppingCartService: ShoppingCartService, private reservationService: ReservationsService) {}

  ngOnInit(): void {
    this.items = this.shoppingCartService.obtenerCarrito();
    console.log(this.items);
  }

  ReservarTodo() {
    for (let item of this.items) {
      this.reservationService.agregarAReserva(item);
    }
  }
}
