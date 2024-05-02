export class Restaurant {
  id: string;
  nombre: string;
  imagen: string;
  descripcion: string;
  locationCost: string;
  cuisines: string;
  mustTry: string;
  openingHours: string;

  constructor(id: string, nombre: string, imagen: string, descripcion: string, locationCost: string, cuisines: string, mustTry: string, openingHours: string) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.descripcion = descripcion;
    this.locationCost = locationCost;
    this.cuisines = cuisines;
    this.mustTry = mustTry;
    this.openingHours = openingHours;
    this.id = id;
  }
}
