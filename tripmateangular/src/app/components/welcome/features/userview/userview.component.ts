import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {User} from "../../../../models/user.model";
import {TripmateApiService} from "../../../../services/tripmate-api.service";

@Component({
  selector: 'app-userview',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './userview.component.html',
  styleUrl: './userview.component.scss'
})
export class UserviewComponent implements OnInit {
  userData!: User;
  users: User[] = [];
  constructor(private apiService: TripmateApiService, private router: Router) {
    this.userData = {} as User;
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.apiService.getUsers().subscribe((data: any) => {
      if(Array.isArray(data)) {
        this.users = data.map(user => new User(
          user.dni,
          user.nombre,
          user.correo,
          user.contrasenia,
          user.fechaRegistro,
          user.celular,
          user.plan
        ));
        console.log(this.users);
      }else {
        console.error('El formato de datos recibido no es un array.');
      }
      },
      error => {
        console.error('Error al obtener datos de actividades:', error);
      }
    );
  }

  MostrarPlanes() {
    this.router.navigateByUrl('/suscription')
  }

  MostrarCrudAccommodation(){
    this.router.navigateByUrl('/admin/accommodationCrud')
  }

  MostrarCrudFlights(){
    this.router.navigateByUrl('/admin/flightsCrud')
  }

  MostrarCrudActivities(){
    this.router.navigateByUrl('/admin/activitiesCrud')
  }

  MostrarCrudRestaurants(){
    this.router.navigateByUrl('/admin/restaurantsCrud')
  }
}
