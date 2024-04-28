import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import {TripmateApiService} from "../../services/tripmate-api.service";
import {MatTab, MatTabChangeEvent, MatTabGroup, MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatTooltip} from "@angular/material/tooltip";
import { trigger, state, style, animate, transition } from '@angular/animations';
import {NotificationsModel} from "../../models/notifications.model";
import {BreakpointState, Breakpoints, BreakpointObserver} from "@angular/cdk/layout";
import {map, Observable} from "rxjs";
import {MatSidenavModule} from "@angular/material/sidenav";
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, CommonModule, MatIconButton, MatTabGroup, MatTab, RouterLink, RouterOutlet, RouterLinkActive,
    MatTabNav, MatTabLink, MatTabNavPanel, MatTooltip, MatSidenav, MatSidenavModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ maxHeight: '0', opacity: '0' }),
        animate('0.5s ease-out', style({ maxHeight: '200px', opacity: '1' })),
      ]),
    ]),
  ],
})

export class ToolbarComponent implements AfterViewInit,OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup | undefined;
  notifications: NotificationsModel[] = [];
  Usuario: string = 'UsuarioExample';
  showNotificationBar: boolean = false;

  constructor(private router: Router, private notificationService: TripmateApiService, public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  toggleNotificationBar() {
    this.showNotificationBar = !this.showNotificationBar;
  }

  getNotifications() {
    this.notificationService.getNotifications().subscribe(
      (data: any[]) => {
        if (Array.isArray(data)) {
          // Filtrar las notificaciones y extraer el texto
          this.notifications = data.map((notification: any) => ({
            text: notification.text
          }));
        } else {
          console.error('El formato de datos recibido no es un array.');
        }
      },
      (error) => {
        console.error('Error al obtener las notificaciones:', error);
      }
    );
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: BreakpointState) => result.matches)
    );
  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }
  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.tabGroup) {
        let currentRoute = event.url.split('/').pop(); // Obtener la última parte de la ruta
        const tabLabels = ['accommodations', 'flights', 'activities', 'restaurants', 'myjourneys', 'shoppingcart, userview'];

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
        const routes = ['accommodations', 'flights', 'activities', 'restaurants', 'myjourneys', 'shoppingcart, userview'];
        const selectedRoute = routes[event.index];
        this.router.navigate([selectedRoute]);
      });
    }

  }
}
