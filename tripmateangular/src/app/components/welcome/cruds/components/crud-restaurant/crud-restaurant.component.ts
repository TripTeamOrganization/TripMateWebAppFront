import { Component, OnInit, ViewChild } from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCell, MatColumnDef, MatHeaderCell, MatHeaderRow, MatRow, MatTable} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import { MatTableModule } from '@angular/material/table';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";
import {MatInputModule} from '@angular/material/input';
import {MatSort} from "@angular/material/sort";
import { NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import cloneDeep  from 'lodash/cloneDeep';
import { MatTableDataSource } from '@angular/material/table';
import {MatToolbar} from "@angular/material/toolbar";
import {CrudService} from "../../services/crud.service";
import {Restaurant} from "../../../../../models/restaurant.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-crud-restaurant',
  standalone: true,
    imports: [
        MatFormField,
        MatInput,
        FormsModule,
        CommonModule,
        MatTableModule,
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        ReactiveFormsModule,
        HttpClientModule,
        MatCell,
        MatIcon,
        MatSort,
        MatIconButton,
        MatInputModule,
        MatHeaderRow,
        MatRow,
        MatPaginator,
        MatButton,
        MatToolbar,
        RouterLink
    ],

  templateUrl: './crud-restaurant.component.html',
  styleUrl: './crud-restaurant.component.scss',
  providers: [CrudService]
})
export class CrudRestaurantComponent implements OnInit{

  @ViewChild('restaurantForm', {static: false}) restaurantForm!: NgForm; resturantsData: Restaurant;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'nombre','imagen','descripcion','locationCost','cuisines','mustTry','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isEditmode = false;

  @ViewChild(MatSort) sort!: MatSort;
  showDeleteSuccessMessage = false;

  isEditMode = false; //Inicia si el formulario esta en modo edición
  constructor(private restaurantService: CrudService){
    this.resturantsData = {} as Restaurant;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllRestaurants();
  }

  getAllRestaurants(){
    this.restaurantService.getRestaurants().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Restaurant){
    this.resturantsData = cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit(){
    this.isEditMode = false;
    this.restaurantForm.resetForm();
  }

  deleteItem(id: string) {
    this.restaurantService.deleteRestaurants(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => o.id !== id);
      this.showDeleteSuccessMessage = true; // Mostrar el mensaje de éxito al eliminar la película
      console.log("Se eliminó con éxito"); // Agregamos esta línea para verificar
      setTimeout(() => {
        this.showDeleteSuccessMessage = false; // Ocultar el mensaje después de 3 segundos
      }, 3000);
    });
  }


  addRestaurant() {
    let maxID: number = 0;
    maxID = this.dataSource.data.reduce((max: number, restaurant: any) => restaurant.id > max ? restaurant.id : max, 0);
    this.resturantsData.id = (Number(maxID) + 1).toString();

    console.log('Nuevo ID:', this.resturantsData.id);
    console.log('Datos del alojamiento:', this.resturantsData);

    this.restaurantService.createRestaurants(this.resturantsData).subscribe(
      (response: any) => {
        this.dataSource.data.push(response);
        this.dataSource.data = [...this.dataSource.data];
      },
      (error) => {
        console.error('Error al agregar el alojamiento:', error);
      }
    );
  }


  updateRestaurant(){
    this.restaurantService.updateRestaurants(this.resturantsData.id, this.resturantsData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o:any) => {
        if(o.id === response.id){
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit(){
    if(this.restaurantForm.form.valid){
      if(this.isEditMode){
        this.updateRestaurant();
      }else{
        this.addRestaurant();
      }
      this.cancelEdit();
    }else{
      console.log('Invalid Data');
    }
  }
}
