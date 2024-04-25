export class Accommodation {
  nombre: string;
  puntuacion: string;
  imagen: string;
  descripcion: string;
  precio: string;
  direccion: string;
  telefono: string;
  sitioWeb: string;

  constructor(
    nombre: string,
    puntuacion: string,
    imagen: string,
    descripcion: string,
    precio: string,
    direccion: string,
    telefono: string,
    sitioWeb: string
  ) {
    this.nombre = nombre;
    this.puntuacion = puntuacion;
    this.imagen = imagen;
    this.descripcion = descripcion;
    this.precio = precio;
    this.direccion = direccion;
    this.telefono = telefono;
    this.sitioWeb = sitioWeb;
  }
}
