import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'edadMascota', standalone: false })
export class EdadMascotaPipe implements PipeTransform {
  transform(fechaNacimiento: Date | string): string {
    if (!fechaNacimiento) return 'Edad desconocida';
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();
    let anios = hoy.getFullYear() - nacimiento.getFullYear();
    let meses = hoy.getMonth() - nacimiento.getMonth();
    if (meses < 0) { anios--; meses += 12; }
    if (anios === 0) return `${meses} ${meses === 1 ? 'mes' : 'meses'}`;
    if (meses === 0) return `${anios} ${anios === 1 ? 'año' : 'años'}`;
    return `${anios} ${anios === 1 ? 'año' : 'años'} ${meses} ${meses === 1 ? 'mes' : 'meses'}`;
  }
}
