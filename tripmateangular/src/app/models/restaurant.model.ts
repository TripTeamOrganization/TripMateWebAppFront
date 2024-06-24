export class Restaurant {
  id: string;
  name: string;
  imagePath: string;
  locationCost: string;
  mustTry: string;

  constructor(id: string, name: string, imagePath: string, locationCost: string, mustTry: string) {
    this.id = id;
    this.name = name;
    this.imagePath = imagePath;
    this.locationCost = locationCost;
    this.mustTry = mustTry;
  }
}
