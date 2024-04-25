import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import {MatTab, MatTabChangeEvent, MatTabGroup, MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import {routes} from '../../app.routes';
import {MatTooltip} from "@angular/material/tooltip";
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatIconButton, MatTabGroup, MatTab, RouterLink, RouterOutlet, RouterLinkActive, MatTabNav, MatTabLink, MatTabNavPanel, MatTooltip],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements AfterViewInit {
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup | undefined;
  Usuario: string = 'UsuarioExample';

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.tabGroup) {
        let currentRoute = event.url.split('/').pop(); // Obtener la última parte de la ruta
        const tabLabels = ['accommodations', 'flights', 'activities', 'restaurants', 'myjourneys', 'shoppingcart'];

        // Si la última parte de la ruta está vacía (es la ruta raíz), establecerla en 'restaurants'
        if (!currentRoute) {
          currentRoute = 'restaurants';
        }

        const tabIndex = tabLabels.findIndex(label => label === currentRoute);
        if (tabIndex !== -1) {
          this.tabGroup.selectedIndex = tabIndex;
        }
      }
    });

    if (this.tabGroup) {
      this.tabGroup.selectedTabChange.subscribe((event: MatTabChangeEvent) => {
        const routes = ['accommodations', 'flights', 'activities', 'restaurants', 'myjourneys', 'shoppingcart'];
        const selectedRoute = routes[event.index];
        this.router.navigate([selectedRoute]);
      });
    }
  }
}
