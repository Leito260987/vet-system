import { Animal } from '../../shared/models/animal.model';

export enum Especie {
  PERRO = 'Perro',
  GATO = 'Gato',
  AVE = 'Ave',
  ROEDOR = 'Roedor',
  OTRO = 'Otro'
}

export interface Duenio {
  readonly id: string;
  nombre: string;
  dni: string;
  telefono: string;
  correo?: string;
}

export interface ApiResponse<T> {
  data: T;
  mensaje: string;
  exitoso: boolean;
}

export class Perro extends Animal {
  constructor(nombre: string, fechaNacimiento: Date, public raza: string) { super(nombre, fechaNacimiento); }
  getTipoAtencion(): string { return 'Consulta canina — requiere bozal si es necesario'; }
}

export class Gato extends Animal {
  constructor(nombre: string, fechaNacimiento: Date, public raza: string) { super(nombre, fechaNacimiento); }
  getTipoAtencion(): string { return 'Consulta felina — ambiente tranquilo recomendado'; }
}

export interface Mascota {
  id: string;
  nombre: string;
  especie: Especie;
  raza: string;
  fechaNacimiento: Date;
  observaciones?: string;
  duenio: Duenio;
}
