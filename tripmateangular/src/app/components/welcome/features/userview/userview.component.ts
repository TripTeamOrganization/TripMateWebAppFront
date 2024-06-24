import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {User} from "../../../../models/user.model";
import {TripmateApiService} from "../../../../services/tripmate-api.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-userview',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './userview.component.html',
  styleUrl: './userview.component.scss'
})
export class UserviewComponent implements OnInit {
  userData!: User;
  users: User[] = [];
  selectedUser: User | undefined;
  constructor(private apiService: TripmateApiService, private router: Router, private authService:AuthService) {
    this.userData = {} as User;
  }

  ngOnInit() {
    this.getUser();
    this.selectedUser = this.users.find(user => user.nombre === 'Messo')
  }

  getUser() {
    this.apiService.getUsers().subscribe((data: any) => {
      if(Array.isArray(data)) {
        this.users = data.map(user => new User(
          user.id,
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

  vistaAdmin(){
    this.router.navigateByUrl('/admin/accommodationCrud')
  }

  vistaForgotPassword(){
    this.router.navigateByUrl('/forgot-password')
  }

  vistaSigin(){
    this.authService.logOut()
    this.router.navigateByUrl('/signin')

  }

  vistaChangeEmail(){
    this.router.navigateByUrl('/change-email')
  }
}
