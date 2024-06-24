export class Activity {
  id: string;
  name: string;
  imagePath: string;
  description: string;
  location: string;
  price: string;

  constructor(  id: string,name: string, image: string, description: string, location: string,price: string) {
    this.name = name;
    this.imagePath = image;
    this.description = description;
    this.location = location;
    this.price = price;
    this.id = id;
  }
}
