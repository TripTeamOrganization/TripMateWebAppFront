import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent {
  constructor(private router: Router) { }
  isRegisteredRoute() {
    if (this.router.url === '/register') {
      console.log('Register route');
      return true;
    } 
    
    else {
    return false;
    }
  }
}
