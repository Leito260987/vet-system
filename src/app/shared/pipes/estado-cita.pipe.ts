import { Pipe, PipeTransform } from '@angular/core';
import { EstadoCita } from '../../citas/models/cita.model';

export interface EstadoCitaOutput {
  texto: string;
  clase: string;
  icono: string;
}

@Pipe({ name: 'estadoCita', standalone: false })
export class EstadoCitaPipe implements PipeTransform {
  private readonly mapa: Record<EstadoCita, EstadoCitaOutput> = {
    [EstadoCita.PENDIENTE]:  { texto: 'Pendiente',  clase: 'badge bg-warning text-dark', icono: 'bi-clock' },
    [EstadoCita.CONFIRMADA]: { texto: 'Confirmada', clase: 'badge bg-success',           icono: 'bi-check-circle' },
    [EstadoCita.CANCELADA]:  { texto: 'Cancelada',  clase: 'badge bg-danger',            icono: 'bi-x-circle' },
    [EstadoCita.COMPLETADA]: { texto: 'Completada', clase: 'badge bg-secondary',         icono: 'bi-check2-all' },
  };

  transform(estado: EstadoCita, campo: keyof EstadoCitaOutput = 'texto'): string {
    return this.mapa[estado]?.[campo] ?? estado;
  }
}
