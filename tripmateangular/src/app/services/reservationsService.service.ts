import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  reservas: any[] = [];

  agregarAReserva(item: any) {
    this.reservas.push(item);
    let contador: number = this.reservas.length;
    console.log("Se ha agregado el siguiente item a la reserva: ", item);
    if (contador % 3 === 0) {
      console.log("Recuento de cantidad de reserva: ", contador);
    }
  }

  eliminarDeReserva(index: number) {
    if (index >= 0 && index < this.reservas.length) {
      this.reservas.splice(index, 1);
    }
  }
  obtenerReserva(): any[] {
    return this.reservas;
  }
}
