import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import {MatTab, MatTabChangeEvent, MatTabGroup, MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
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
  Usuario: string='UsuarioExample';

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    if (this.tabGroup) {
      this.tabGroup.selectedTabChange.subscribe((event: MatTabChangeEvent) => {
        const routes = ['accommodations', 'flights', 'activities', 'restaurants', 'myjourneys'];
        const selectedRoute = routes[event.index];
        this.router.navigate([selectedRoute]);
      });
    }
  }
}
