export class Accommodation {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  ubicacion: string;
  price: string;

  constructor(id: number, name: string, imagePath: string, description: string, ubicacion: string, price: string) {
    this.id = id;
    this.name = name;
    this.imagePath = imagePath;
    this.description = description;
    this.ubicacion = ubicacion;
    this.price = price;
  }
}
