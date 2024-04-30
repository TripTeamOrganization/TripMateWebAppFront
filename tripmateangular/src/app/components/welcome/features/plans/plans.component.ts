import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {CardPlanComponent} from "../../../../../public/shared/card-plan/card-plan.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [MatCardModule, CardPlanComponent],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss'
})
export class PlansComponent {

  constructor(private router: Router) {}

  mostrarPago() {
    this.router.navigateByUrl('/payment');
  }

}
