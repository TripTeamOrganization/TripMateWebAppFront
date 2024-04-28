export class Activity {
  nombre: string;
  imagen: string;
  descripcion: string;
  ubicacion: string;

  constructor(name: string, image: string, description: string, location: string) {
    this.nombre = name;
    this.imagen = image;
    this.descripcion = description;
    this.ubicacion = location;
  }
}
