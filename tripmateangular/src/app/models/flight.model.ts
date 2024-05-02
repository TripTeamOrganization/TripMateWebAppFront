export class Flight {
  id: string;
  nombre: string;
  imagen: string;
  tipo: string;
  duracion: string;
  descripcion: string;
  precio: string;
  ubicacion: string;

  constructor(  id: string, nombre: string, imagen: string, tipo: string, duracion: string, ubicacion: string, precio: string, descripcion: string) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.tipo = tipo;
    this.duracion = duracion;
    this.ubicacion = ubicacion;
    this.precio = precio;
    this.descripcion = descripcion;
    this.id = id;
  }
}
