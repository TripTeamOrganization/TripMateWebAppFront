import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  reservas: any[] = localStorage.getItem('array') == null ? [] :  JSON.parse(localStorage.getItem('array')!);

  constructor() {
    // Agrega un listener para el evento unload
    window.addEventListener('unload', () => {
      // Vacía la lista de reservas y actualiza el localStorage
      this.reservas = [];
      localStorage.setItem('array', JSON.stringify(this.reservas));
    });
  }

  agregarAReserva(item: any) {
    // Verifica si el elemento ya existe en el array de reservas
    if (!this.reservas.includes(item)) {
      this.reservas.push(item);
      let contador: number = this.reservas.length;
      console.log("Se ha agregado el siguiente item a la reserva: ", item);
      if (contador % 3 === 0) {
        console.log("Recuento de cantidad de reserva: ", contador);
      }

      console.log('array reservas:', this.reservas);

      //CAMBIAR A BACKEND. LLAMAR AL SERVICIO Y GUARDAR LAS RESERVAS
      localStorage.setItem('array', JSON.stringify(this.reservas));
    }
  }
  estaReservado(item: any): boolean {
    return this.reservas.some(reserva => reserva.title === item.title);
  }
}
