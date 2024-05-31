export class User {
  id : string;
  dni: string;
  nombre: string;
  correo: string;
  password: string;
  fechaRegistro: string;
  celular: number;
  plan: string;

  constructor(id: string,dni: string, nombre: string, correo: string, password: string, fechaRegistro: string, celular: number, plan: string) {
    this.id = id;
    this.dni = dni;
    this.nombre = nombre;
    this.correo = correo;
    this.password = password;
    this.fechaRegistro = fechaRegistro;
    this.celular = celular;
    this.plan = plan;
  }
}
