import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
  @Input() textoplaceholder: string = '';
  @Output() searchChanged = new EventEmitter<string>();

  searchQuery: string = '';

  onSearch() {
    this.searchChanged.emit(this.searchQuery);
  }
}
