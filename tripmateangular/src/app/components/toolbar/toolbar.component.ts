import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import {MatTab, MatTabChangeEvent, MatTabGroup, MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import {routes} from '../../app.routes';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatIconButton, MatTabGroup, MatTab, RouterLink, RouterOutlet, RouterLinkActive, MatTabNav, MatTabLink, MatTabNavPanel],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements AfterViewInit {
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup | undefined;

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    if (this.tabGroup) {
      this.tabGroup.selectedTabChange.subscribe((event: MatTabChangeEvent) => {
        if (event.index === 0) {
          this.router.navigate(['welcome/features/accommodations']);
        }
        if (event.index === 1) {
          this.router.navigate(['welcome/features/activities']);
        }
        if (event.index === 2) {
          this.router.navigate(['welcome/features/flights-component']);
        }
      });
    }
  }
}
