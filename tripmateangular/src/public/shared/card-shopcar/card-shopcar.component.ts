import {Component, Input} from '@angular/core';
import {ShoppingCartService} from "../../../app/services/shoppingcardService";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {NgIf} from "@angular/common";
import {MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {ReservationsService} from "../../../app/services/reservationsService.service";

@Component({
  selector: 'app-card-shopcar',
  standalone: true,
  imports: [
    MatTooltip,
    MatDatepickerInput,
    NgIf,
    MatLabel,
    MatDatepickerToggle,
    MatSuffix,
    MatDatepicker,
    MatInput,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './card-shopcar.component.html',
  styleUrl: './card-shopcar.component.scss'
})
export class CardShopcarComponent {
  @Input() title: string = '';
  @Input() sourceimage: string = '';
  @Input() price: string = '';

  mostrarDatepicker: boolean = false;
  fechaSeleccionada: Date | null = null;
  temporizador: any;
  reservado: boolean = false;

  constructor(private shoppingCartService: ShoppingCartService, private reservationService: ReservationsService) { }

  private crearItem(): any {
    return {
      title: this.title,
      sourceimage: this.sourceimage,
      price: this.price,
      fecha: this.fechaSeleccionada
    };
  }

  EliminarEnCarrito() {
    const item = this.crearItem();
    console.log('Elemento eliminado del carrito:', item);
    this.shoppingCartService.eliminarDelCarrito(item);
  }

  activarDatepicker() {
    this.mostrarDatepicker = true;
    this.iniciarTemporizador();
  }

  desactivarDatepicker() {
    this.mostrarDatepicker = false;
    clearTimeout(this.temporizador);
  }

  ReservarEnCarrito() {
    const item = this.crearItem();
    console.log('Elemento Reservado en carrito:', item);
    this.reservationService.agregarAReserva(item);
    this.reservado = true;
  }

  iniciarTemporizador() {
    this.temporizador = setTimeout(() => {
      if (!this.fechaSeleccionada) {
        this.desactivarDatepicker();
      }
    }, 10000); // se puede cambiar (10 seg default)
  }

  reiniciarTemporizador() {
    clearTimeout(this.temporizador);
    this.iniciarTemporizador();
  }
}
