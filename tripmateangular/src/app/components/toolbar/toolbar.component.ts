import { Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import {Router, RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatIconButton, MatTabGroup, MatTab, RouterLink, RouterOutlet],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

}
