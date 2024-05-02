export class Accommodation {
  id: string;
  nombre: string;
  imagen: string;
  descripcion: string;
  precio: string;
  ubicacion: string;

  constructor(id: string,name: string, image: string, description: string, location: string,  precio: string) {
    this.id = id;
    this.nombre = name;
    this.imagen = image;
    this.descripcion = description;
    this.ubicacion = location;
    this.precio = precio;
  }
}
