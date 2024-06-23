import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf} from "@angular/common";
import {MatCardActions} from "@angular/material/card";
import {Router} from "@angular/router";
import {ReservationsService} from "../../../../services/reservationsService.service";
import {forEach} from "lodash";


@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [

    MatTab,
    MatTabGroup,
    RouterLink,
    RouterLinkActive,
    NgForOf,
    MatCardActions,

  ],

  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.scss'
})
export class ItineraryComponent implements  OnInit {

  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  reservationsOfWeek: string[] = ['', '', '', '', '', '', ''];

  selectedDay: number | null = null;
  constructor(
    private router: Router,
    private reservationService: ReservationsService) {

  }

  ngOnInit(): void {
        //console.log('ItineraryComponent:.reservationService.reservas=> ', this.reservationService.reservas);

        //REEMPLAZAR POR EL BACKEND y OBtener desde la base de datos
        let reservasArray = localStorage.getItem('array');
        const reservas =  JSON.parse(reservasArray!);
        //console.log('tineraryComponent:.reservationService.reservas LOCAL STORAGE=>',reservas);

        this.mostrarReserva(reservas);
        //al refrescar que se borre todo el arreglo de reservas
        this.reservationService.reservas = [];
    }

    mostrarReserva(reservas: [any]) {
      //1. obtener la fecha
      //se recorre la lista de reservas:
      for(var i=0; i < reservas.length; i ++) {
          //console.log('mostrarReserva:', reservas[0]['fecha']);

          const fechaCadena = reservas[i]['fecha'];
          //console.log('fecha:', typeof fechaCadena);

          //reservas[0]['fecha']
          const fecha = new Date(fechaCadena);
          //console.log('getday:', fecha.getDay());
          //0 = domingo

        const title = reservas[i]['title'];

         switch ((fecha.getDay())) {
           case 1:
             this.reservationsOfWeek[0] +=  '\n\r' + title ;
             break; //lunes
           case 2: this.reservationsOfWeek[1] += '\n\r' +   title; break;  //m
           case 3: this.reservationsOfWeek[2]  += '\n\r' +   title; break; //x
           case 4: this.reservationsOfWeek[3]  += '\n\r' +   title; break; // j
           case 5: this.reservationsOfWeek[4]  +=  '\n\r' +  title; break; //v
           case 6: this.reservationsOfWeek[5]  += '\n\r' +  title; break; //s
           case 0:  this.reservationsOfWeek[6]  += '\n\r' +   title; break; //d
         }

         console.log('reservations of week:', this.reservationsOfWeek);
      }
      //this.reservationsOfWeek[1] += '\n nuevo valor'
      //2. buscar el  día
      //3. recorrer el html con los días y colocar la reserva
    }

  selectDay(index: number) {
    this.selectedDay = index;
  }
  vistaMain(){
    this.router.navigateByUrl('/accommodations')
  }
}
