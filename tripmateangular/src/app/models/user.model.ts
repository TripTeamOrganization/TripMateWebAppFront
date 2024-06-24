export class User {
  id : string;
  correo: string;
  roles:string;
  constructor(id: string, correo: string, password: string, roles:string) {
    this.id = id;
    this.correo = correo;
    this.roles=roles;
  }
}
