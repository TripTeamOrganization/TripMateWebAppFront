import { Component, Input } from '@angular/core';
import {CardmainComponent} from "../shared/cardmain/cardmain.component";
import {CardgroupComponent} from "../shared/groups/cardgroup";
import { ActivitiesComponentComponent } from '../activities/activities-component.component';
import { Activity } from '../../../../models/activity.interface';


@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [CardmainComponent,
    CardgroupComponent, ActivitiesComponentComponent],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.scss'
})
export class ShoppingcartComponent {
  cart: Activity[] = [];
  @Input() activity: Activity | undefined;
  
  ngOnChanges(changes: { activity: { currentValue: Activity; }; }) {
    if (changes.activity) {
      this.addActivity(changes.activity.currentValue);
    }
  }
  
  addActivity(activity: Activity) {
    this.cart.push(activity);
  }
}
