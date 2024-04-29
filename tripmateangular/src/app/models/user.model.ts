export class User {
  dni: string;
  nombre: string;
  correo: string;
  contrasenia: string;
  fechaRegistro: string;
  celular: number;
  plan: string;

  constructor(dni: string, nombre: string, correo: string, contrasenia: string, fechaRegistro: string, celular: number, plan: string) {
    this.dni = dni;
    this.nombre = nombre;
    this.correo = correo;
    this.contrasenia = contrasenia;
    this.fechaRegistro = fechaRegistro;
    this.celular = celular;
    this.plan = plan;
  }
}
