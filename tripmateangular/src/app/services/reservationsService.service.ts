import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
   reservas: any[] = localStorage.getItem('array') == null ? [] :  JSON.parse(localStorage.getItem('array')!);

  agregarAReserva(item: any) {
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

  eliminarDeReserva(index: number) {
    if (index >= 0 && index < this.reservas.length) {
      this.reservas.splice(index, 1);
    }
  }
  obtenerReserva(): any[] {
    return this.reservas;
  }
}
