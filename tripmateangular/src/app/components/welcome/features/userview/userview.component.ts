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
  usuario: any = null;
  constructor(private apiService: TripmateApiService, private router: Router, private authService:AuthService) {}

  ngOnInit() {
    this.getUsername();
    this.isAdmin();
  }

  isAdmin() {
    return this.usuario.roles.includes('ROLE_ADMIN');
  }
  getUsername() {
    this.apiService.getUser().subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: (error) => {
        console.error('Hubo un error al obtener los datos del usuario:', error);
      }
    });
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
