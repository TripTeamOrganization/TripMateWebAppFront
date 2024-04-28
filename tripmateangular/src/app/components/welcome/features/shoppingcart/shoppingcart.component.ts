import {Component, OnInit} from '@angular/core';
import {CardmainComponent} from "../shared/cardmain/cardmain.component";
import {CardgroupComponent} from "../shared/groups/cardgroup";
import {ShoppingCartService} from "../shared/services/shoppingcardService";

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [CardmainComponent,
    CardgroupComponent],
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
