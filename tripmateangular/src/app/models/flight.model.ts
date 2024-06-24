export class Flight {
  idVuelo: number;
  nombreAerolinea: string;
  descripcion: string;
  precio: string;

  constructor(idVuelo: number, nombreAerolinea: string, descripcion: string, precio: string) {
    this.idVuelo = idVuelo;
    this.nombreAerolinea = nombreAerolinea;
    this.descripcion = descripcion;
    this.precio = precio;
  }
}

