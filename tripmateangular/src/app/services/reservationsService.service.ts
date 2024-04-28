import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  reservas: any[] = [];

  agregarAReserva(item: any) {
    this.reservas.push(item);
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
