export class Accommodation {
  nombre: string;
  imagen: string;
  descripcion: string;
  precio: string;
  ubicacion: string;

  constructor(name: string, image: string, description: string, location: string,  precio: string) {
    this.nombre = name;
    this.imagen = image;
    this.descripcion = description;
    this.ubicacion = location;
    this.precio = precio;
  }
}
