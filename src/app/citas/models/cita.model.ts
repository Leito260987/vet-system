export enum EstadoCita {
  PENDIENTE = 'PENDIENTE',
  CONFIRMADA = 'CONFIRMADA',
  CANCELADA = 'CANCELADA',
  COMPLETADA = 'COMPLETADA'
}

export interface Cita {
  id: string;
  mascotaId: string;
  nombreMascota: string;
  nombreDuenio: string;
  veterinario: string;
  fecha: Date;
  hora: string;
  motivo: string;
  estado: EstadoCita;
}
