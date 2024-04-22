import {Component, Input} from '@angular/core';
//sda
@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [

  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
  @Input() textoplaceholder: string = '';

}
