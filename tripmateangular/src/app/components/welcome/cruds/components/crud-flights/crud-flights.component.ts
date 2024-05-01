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
import {Flight} from "../../../../../models/flight.model";

@Component({
  selector: 'app-crud-flights',
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
    MatToolbar
  ],

  templateUrl: './crud-flights.component.html',
  styleUrl: './crud-flights.component.scss',
  providers: [CrudService]
})
export class CrudFlightsComponent implements OnInit{

  @ViewChild('flightForm', {static: false}) flightForm!: NgForm; flightsData: Flight;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'nombre','imagen','descripcion','precio','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isEditmode = false;

  @ViewChild(MatSort) sort!: MatSort;
  showDeleteSuccessMessage = false;

  isEditMode = false; //Inicia si el formulario esta en modo edición
  constructor(private flightService: CrudService){
    this.flightsData = {} as Flight;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllFlights();
  }

  getAllFlights(){
    this.flightService.getFlights().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Flight){
    this.flightsData = cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit(){
    this.isEditMode = false;
    this.flightForm.resetForm();
  }

  deleteItem(id: string) {
    this.flightService.deleteFlights(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => o.id !== id);
      this.showDeleteSuccessMessage = true; // Mostrar el mensaje de éxito al eliminar la película
      console.log("Se eliminó con éxito"); // Agregamos esta línea para verificar
      setTimeout(() => {
        this.showDeleteSuccessMessage = false; // Ocultar el mensaje después de 3 segundos
      }, 3000);
    });
  }


  addFlights() {
    let maxID: number = 0;
    maxID = this.dataSource.data.reduce((max: number, accommodation: any) => accommodation.id > max ? accommodation.id : max, 0);
    this.flightsData.id = (Number(maxID) + 1).toString();

    console.log('Nuevo ID:', this.flightsData.id);
    console.log('Datos del alojamiento:', this.flightsData);

    this.flightService.createFlights(this.flightsData).subscribe(
      (response: any) => {
        this.dataSource.data.push(response); // Aquí deberías agregar la respuesta del servicio, no this.accommodationData
        this.dataSource.data = [...this.dataSource.data];
      },
      (error) => {
        console.error('Error al agregar el alojamiento:', error);
      }
    );
  }


  updateFlights(){
    this.flightService.updateFlights(this.flightsData.id, this.flightsData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o:any) => {
        if(o.id === response.id){
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit(){
    if(this.flightForm.form.valid){
      if(this.isEditMode){
        this.updateFlights();
      }else{
        this.addFlights();
      }
      this.cancelEdit();
    }else{
      console.log('Invalid Data');
    }
  }
}
