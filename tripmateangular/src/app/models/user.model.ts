export class User {
  dni: any;
  nombre: any;
  correo: any;
  contrasenia: any;
  fechaRegistro: any;
  celular: any;
  plan: any;

  constructor(dni: any, nombre: any, correo: any, contrasenia: any, fechaRegistro: any, celular: any, plan: any) {
    this.dni = dni;
    this.nombre = nombre;
    this.correo = correo;
    this.contrasenia = contrasenia;
    this.fechaRegistro = fechaRegistro;
    this.celular = celular;
    this.plan = plan;
  }
}
