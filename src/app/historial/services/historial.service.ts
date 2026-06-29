import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HistorialItem } from '../models/historial-item.model';

/**
 * HistorialService — gestión del historial médico de mascotas.
 */
@Injectable({ providedIn: 'root' })
export class HistorialService {
  private historialSubject = new BehaviorSubject<HistorialItem[]>(this.datosIniciales());

  /**
   * Obtiene el historial de una mascota por su ID.
   * @param mascotaId ID de la mascota
   */
  getPorMascota(mascotaId: string): Observable<HistorialItem[]> {
    return this.historialSubject.asObservable().pipe(
      map(items => items.filter(h => h.mascotaId === mascotaId))
    );
  }

  /**
   * Agrega un nuevo registro al historial.
   * @param item datos del registro sin id
   */
  agregar(item: Omit<HistorialItem, 'id'>): HistorialItem {
    const nuevo: HistorialItem = { ...item, id: `his_${Date.now()}` };
    this.historialSubject.next([...this.historialSubject.getValue(), nuevo]);
    return nuevo;
  }

  private datosIniciales(): HistorialItem[] {
    return [
      { id: 'his_1', mascotaId: 'msc_1', fecha: new Date('2025-01-10'), veterinario: 'Dra. García', titulo: 'Vacunación anual', diagnostico: 'Animal en buen estado de salud', tratamiento: 'Vacuna antirrábica + parvovirus', proximaCita: new Date('2026-01-10') },
      { id: 'his_2', mascotaId: 'msc_3', fecha: new Date('2025-11-15'), veterinario: 'Dr. Rodríguez', titulo: 'Cirugía de esterilización', diagnostico: 'Procedimiento exitoso sin complicaciones', tratamiento: 'Antibióticos 7 días + reposo', proximaCita: new Date('2025-11-30') },
      { id: 'his_3', mascotaId: 'msc_2', fecha: new Date('2026-03-01'), veterinario: 'Dra. García', titulo: 'Control general', diagnostico: 'Leve sobrepeso, dieta recomendada', tratamiento: 'Dieta baja en calorías + ejercicio' },
    ];
  }
}
