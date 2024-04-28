import { Component } from '@angular/core';
import {CardmainComponent} from "../shared/cardmain/cardmain.component";
import {CardgroupComponent} from "../shared/groups/cardgroup";

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [CardmainComponent,
    CardgroupComponent],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.scss'
})
export class ShoppingcartComponent {

}
