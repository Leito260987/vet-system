export abstract class Animal {
  private _nombre: string;
  private _fechaNacimiento: Date;

  constructor(nombre: string, fechaNacimiento: Date) {
    this._nombre = nombre;
    this._fechaNacimiento = fechaNacimiento;
  }

  get nombre(): string { return this._nombre; }
  set nombre(valor: string) {
    if (valor.trim().length < 2) throw new Error('El nombre debe tener al menos 2 caracteres');
    this._nombre = valor.trim();
  }
  get fechaNacimiento(): Date { return this._fechaNacimiento; }

  abstract getTipoAtencion(): string;

  getEdad(): { anios: number; meses: number } {
    const hoy = new Date();
    let anios = hoy.getFullYear() - this._fechaNacimiento.getFullYear();
    let meses = hoy.getMonth() - this._fechaNacimiento.getMonth();
    if (meses < 0) { anios--; meses += 12; }
    return { anios, meses };
  }
}
