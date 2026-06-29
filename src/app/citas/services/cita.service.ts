import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cita, EstadoCita } from '../models/cita.model';

/**
 * CitaService — gestión de citas veterinarias.
 * Estado reactivo con BehaviorSubject.
 */
@Injectable({ providedIn: 'root' })
export class CitaService {
  private citasSubject = new BehaviorSubject<Cita[]>(this.datosIniciales());
  citas$: Observable<Cita[]> = this.citasSubject.asObservable();

  /** @returns Observable con todas las citas */
  getAll(): Observable<Cita[]> { return this.citas$; }

  /**
   * Obtiene citas filtradas por mascota.
   * @param mascotaId ID de la mascota
   */
  getPorMascota(mascotaId: string): Observable<Cita[]> {
    return this.citas$.pipe(map(citas => citas.filter(c => c.mascotaId === mascotaId)));
  }

  /** Obtiene citas del día actual */
  getCitasHoy(): Observable<Cita[]> {
    return this.citas$.pipe(map(citas => {
      const hoy = new Date().toDateString();
      return citas.filter(c => new Date(c.fecha).toDateString() === hoy);
    }));
  }

  /**
   * Agenda una nueva cita.
   * @param cita datos de la cita sin id ni estado
   */
  agendar(cita: Omit<Cita, 'id' | 'estado'>): Cita {
    const nueva: Cita = { ...cita, id: `cit_${Date.now()}`, estado: EstadoCita.PENDIENTE };
    this.citasSubject.next([...this.citasSubject.getValue(), nueva]);
    return nueva;
  }

  /**
   * Actualiza el estado de una cita.
   * @param id ID de la cita
   * @param estado nuevo estado
   */
  cambiarEstado(id: string, estado: EstadoCita): void {
    const citas = this.citasSubject.getValue().map(c => c.id === id ? { ...c, estado } : c);
    this.citasSubject.next(citas);
  }

  private datosIniciales(): Cita[] {
    const manana = new Date(); manana.setDate(manana.getDate() + 1);
    const hoy = new Date();
    return [
      { id: 'cit_1', mascotaId: 'msc_3', nombreMascota: 'Max', nombreDuenio: 'Carlos Pérez', veterinario: 'Dra. García', fecha: hoy, hora: '09:00', motivo: 'Control post-operatorio', estado: EstadoCita.CONFIRMADA },
      { id: 'cit_2', mascotaId: 'msc_2', nombreMascota: 'Luna', nombreDuenio: 'María López', veterinario: 'Dr. Rodríguez', fecha: hoy, hora: '10:30', motivo: 'Vacunación', estado: EstadoCita.PENDIENTE },
      { id: 'cit_3', mascotaId: 'msc_1', nombreMascota: 'Firulais', nombreDuenio: 'Carlos Pérez', veterinario: 'Dra. García', fecha: manana, hora: '09:00', motivo: 'Revisión general', estado: EstadoCita.PENDIENTE },
    ];
  }
}
