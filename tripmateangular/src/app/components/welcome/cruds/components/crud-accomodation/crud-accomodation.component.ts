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
import {Accommodation} from "../../../../../models/accomodation.model";
import {CrudService} from "../../services/crud.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-crud-accomodation',
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

  templateUrl: './crud-accomodation.component.html',
  styleUrl: './crud-accomodation.component.scss',
  providers: [CrudService]
})
export class CrudAccomodationComponent implements OnInit{

  @ViewChild('accomodationForm', {static: false}) offersForm!: NgForm; accommodationData: Accommodation;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'nombre','imagen','descripcion','precio','ubicacion','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isEditmode = false;

  @ViewChild(MatSort) sort!: MatSort;
  showDeleteSuccessMessage = false;

  isEditMode = false; //Inicia si el formulario esta en modo edición
  constructor(private accomodationService: CrudService, private router: Router){
    this.accommodationData = {} as Accommodation;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllAccomodations();
  }

  getAllAccomodations(){
    this.accomodationService.getAccomodations().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Accommodation){
    this.accommodationData = cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit(){
    this.isEditMode = false;
    this.offersForm.resetForm();
  }

  deleteItem(id: string) {
    this.accomodationService.deleteAccomodation(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => o.id !== id);
      this.showDeleteSuccessMessage = true; // Mostrar el mensaje de éxito al eliminar la película
      console.log("Se eliminó con éxito"); // Agregamos esta línea para verificar
      setTimeout(() => {
        this.showDeleteSuccessMessage = false; // Ocultar el mensaje después de 3 segundos
      }, 3000);
    });
  }


  addAccommodation() {
    let maxID: number = 0;
    maxID = this.dataSource.data.reduce((max: number, accommodation: any) => accommodation.id > max ? accommodation.id : max, 0);
    this.accommodationData.id = (Number(maxID) + 1).toString();

    console.log('Nuevo ID:', this.accommodationData.id);
    console.log('Datos del alojamiento:', this.accommodationData);

    this.accomodationService.createAccommodation(this.accommodationData).subscribe(
      (response: any) => {
        this.dataSource.data.push(response); // Aquí deberías agregar la respuesta del servicio, no this.accommodationData
        this.dataSource.data = [...this.dataSource.data];
      },
      (error) => {
        console.error('Error al agregar el alojamiento:', error);
      }
    );
  }


  updateAccomodation(){
    this.accomodationService.updateAccomodation(this.accommodationData.id, this.accommodationData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o:any) => {
        if(o.id === response.id){
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit(){
    if(this.offersForm.form.valid){
      if(this.isEditMode){
        this.updateAccomodation();
      }else{
        this.addAccommodation();
      }
      this.cancelEdit();
    }else{
      console.log('Invalid Data');
    }
  }
}
