import {Component, OnInit} from '@angular/core';
import {CardgroupComponent} from "../../../../../public/shared/groups/cardgroup/cardcontainer/cardgroup.component";
import {CardmainComponent} from "../../../../../public/shared/cardmain/cardmain.component";
import {ShoppingCartService} from "../../../../services/shoppingcardService";

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [CardmainComponent,
    CardgroupComponent, CardmainComponent],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.scss'
})
export class ShoppingcartComponent implements OnInit{
  item: any[] = [];
  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    //console.log(this.shoppingCartService.carrito);
    this.item = this.shoppingCartService.obtenerCarrito();
    console.log(this.item);
  }
}
