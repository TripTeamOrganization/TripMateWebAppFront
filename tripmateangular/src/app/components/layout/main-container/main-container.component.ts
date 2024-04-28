import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {RegisterComponent} from "../../welcome/features/register/register.component";

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [
    RegisterComponent
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent {
  constructor(private router: Router) { }
  isRegisteredRoute() {
    if (this.router.url === '/register') {
      return true;
    }
    else {
    return false;
    }
  }
}
