export class Activity {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  location: string;
  price: string;

  constructor(id: number, name: string, imagePath: string, description: string, location: string, price: string) {
    this.id = id;
    this.name = name;
    this.imagePath = imagePath;
    this.description = description;
    this.location = location;
    this.price = price;
  }
}
