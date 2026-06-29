export interface HistorialItem {
  id: string;
  mascotaId: string;
  fecha: Date;
  veterinario: string;
  titulo: string;
  diagnostico: string;
  tratamiento: string;
  proximaCita?: Date;
}
