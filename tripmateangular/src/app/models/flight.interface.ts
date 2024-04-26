export class Flight {
  nombre: string;
  imagen: string;
  tipo: string;
  duracion: string;
  precio: string;
  ubicacion: string;

  constructor(nombre: string, imagen: string, tipo: string, duracion: string, ubicacion: string, precio: string) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.tipo = tipo;
    this.duracion = duracion;
    this.ubicacion = ubicacion;
    this.precio = precio;
  }
}
