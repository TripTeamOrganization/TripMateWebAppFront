export class Restaurant {
  id: string;
  name: string;
  image: string;
  locationCost: string;
  mustTry: string;

  constructor(id: string, name: string, image: string, locationCost: string, mustTry: string) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.locationCost = locationCost;
    this.mustTry = mustTry;
  }
}
