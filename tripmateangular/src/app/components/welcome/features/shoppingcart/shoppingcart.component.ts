import {Component, OnInit} from '@angular/core';
import {CardgroupComponent} from "../../../../../public/shared/groups/cardgroup";
import {ShoppingCartService} from "../../../../services/shoppingcardService";
import {CardShopcarComponent} from "../../../../../public/shared/card-shopcar/card-shopcar.component";

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [CardgroupComponent, CardShopcarComponent],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.scss'
})
export class ShoppingcartComponent implements OnInit{
  items: any[] = [];
  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.items = this.shoppingCartService.obtenerCarrito();
    console.log(this.items);
  }
}
