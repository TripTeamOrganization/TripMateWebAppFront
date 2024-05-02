export class Activity {
  nombre: string;
  imagen: string;
  descripcion: string;
  ubicacion: string;
  precio: string;

  constructor(name: string, image: string, description: string, location: string,precio: string) {
    this.nombre = name;
    this.imagen = image;
    this.descripcion = description;
    this.ubicacion = location;
    this.precio = precio;
  }
}
