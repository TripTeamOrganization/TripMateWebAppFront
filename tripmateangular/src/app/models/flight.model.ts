export class Flight {
  idVuelo: number;
  nombreAerolinea: string;
  imagePath: string;
  descripcion: string;
  precio: string;

  constructor(idVuelo: number, nombreAerolinea: string, imagePath: string, descripcion: string, precio: string) {
    this.idVuelo = idVuelo;
    this.nombreAerolinea = nombreAerolinea;
    this.imagePath = imagePath;
    this.descripcion = descripcion;
    this.precio = precio;
  }
}
