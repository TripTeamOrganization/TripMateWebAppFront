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
import {Activity} from "../../../../../models/activity.model";

@Component({
  selector: 'app-crud-activities',
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

  templateUrl: './crud-activities.component.html',
  styleUrl: './crud-activities.component.scss',
  providers: [CrudService]
})
export class CrudActivitiesComponent implements OnInit{

  @ViewChild('activitiesForm', {static: false}) activitiesForm!: NgForm; activitiesData: Activity;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'nombre','imagen','descripcion','precio','ubicacion','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isEditmode = false;

  @ViewChild(MatSort) sort!: MatSort;
  showDeleteSuccessMessage = false;

  isEditMode = false; //Inicia si el formulario esta en modo edición
  constructor(private activityService: CrudService){
    this.activitiesData = {} as Activity;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllActivities();
  }

  getAllActivities(){
    this.activityService.getActivity().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Activity){
    this.activitiesData = cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit(){
    this.isEditMode = false;
    this.activitiesForm.resetForm();
  }

  deleteItem(id: string) {
    this.activityService.deleteActivity(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => o.id !== id);
      this.showDeleteSuccessMessage = true; // Mostrar el mensaje de éxito al eliminar la película
      console.log("Se eliminó con éxito"); // Agregamos esta línea para verificar
      setTimeout(() => {
        this.showDeleteSuccessMessage = false; // Ocultar el mensaje después de 3 segundos
      }, 3000);
    });
  }


  addActivity() {
    let maxID: number = 0;
    maxID = this.dataSource.data.reduce((max: number, activities: any) => activities.id > max ? activities.id : max, 0);
    this.activitiesData.id = (Number(maxID) + 1).toString();

    console.log('Nuevo ID:', this.activitiesData.id);
    console.log('Datos del alojamiento:', this.activitiesData);

    this.activityService.createActivity(this.activitiesData).subscribe(
      (response: any) => {
        this.dataSource.data.push(response);
        this.dataSource.data = [...this.dataSource.data];
      },
      (error) => {
        console.error('Error al agregar el alojamiento:', error);
      }
    );
  }


  updateActiviy(){
    this.activityService.updateActivity(this.activitiesData.id, this.activitiesData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o:any) => {
        if(o.id === response.id){
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit(){
    if(this.activitiesForm.form.valid){
      if(this.isEditMode){
        this.updateActiviy();
      }else{
        this.addActivity();
      }
      this.cancelEdit();
    }else{
      console.log('Invalid Data');
    }
  }
}
