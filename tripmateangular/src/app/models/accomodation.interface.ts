export class Accommodation {
  nombre: string;
  imagen: string;
  datosAdicionales: string;

  constructor(
    nombre: string,
    imagen: string,
    datosAdicionales: string,
  ) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.datosAdicionales = datosAdicionales;
  }
}
