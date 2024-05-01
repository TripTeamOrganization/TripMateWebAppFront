export class Accommodation {
  id: string;
  nombre: string;
  imagen: string;
  descripcion: string;
  precio: string;
  ubicacion: string;

  constructor(id: string,name: string, imagen: string, descripcion: string, ubicacion: string,  precio: string) {
    this.id = id;
    this.nombre = name;
    this.imagen = imagen;
    this.descripcion = descripcion;
    this.ubicacion = ubicacion;
    this.precio = precio;
  }
}
