import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mascota, Duenio, ApiResponse, Especie } from '../models/mascota.model';

/**
 * MascotaService — gestión completa de mascotas y sus dueños.
 * Usa BehaviorSubject para estado reactivo sin backend.
 */
@Injectable({ providedIn: 'root' })
export class MascotaService {
  private mascotasSubject = new BehaviorSubject<Mascota[]>(this.datosIniciales());
  mascotas$: Observable<Mascota[]> = this.mascotasSubject.asObservable();

  /** @returns Observable con todas las mascotas */
  getAll(): Observable<Mascota[]> { return this.mascotas$; }

  /**
   * Busca mascotas por nombre o nombre del dueño.
   * @param termino texto de búsqueda
   */
  buscar(termino: string): Observable<Mascota[]> {
    return this.mascotas$.pipe(
      map(mascotas => mascotas.filter(m =>
        m.nombre.toLowerCase().includes(termino.toLowerCase()) ||
        m.duenio.nombre.toLowerCase().includes(termino.toLowerCase())
      ))
    );
  }

  /**
   * Obtiene una mascota por su ID.
   * @param id identificador único
   */
  getById(id: string): Observable<Mascota | undefined> {
    return this.mascotas$.pipe(map(mascotas => mascotas.find(m => m.id === id)));
  }

  /**
   * Registra una nueva mascota.
   * @param mascota datos del formulario sin id
   */
  registrar(mascota: Omit<Mascota, 'id'>): ApiResponse<Mascota> {
    const nueva: Mascota = { ...mascota, id: this.generarId() };
    this.mascotasSubject.next([...this.mascotasSubject.getValue(), nueva]);
    return { data: nueva, mensaje: 'Mascota registrada correctamente', exitoso: true };
  }

  /**
   * Actualiza una mascota existente.
   * @param id ID de la mascota
   * @param cambios campos parciales a modificar
   */
  actualizar(id: string, cambios: Partial<Mascota>): ApiResponse<Mascota | null> {
    const actuales = this.mascotasSubject.getValue();
    const idx = actuales.findIndex(m => m.id === id);
    if (idx === -1) return { data: null, mensaje: 'Mascota no encontrada', exitoso: false };
    const actualizada = { ...actuales[idx], ...cambios };
    actuales[idx] = actualizada;
    this.mascotasSubject.next([...actuales]);
    return { data: actualizada, mensaje: 'Mascota actualizada', exitoso: true };
  }

  /** Elimina una mascota por ID */
  eliminar(id: string): ApiResponse<boolean> {
    this.mascotasSubject.next(this.mascotasSubject.getValue().filter(m => m.id !== id));
    return { data: true, mensaje: 'Mascota eliminada', exitoso: true };
  }

  private generarId(): string {
    return `msc_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  }

  private datosIniciales(): Mascota[] {
    const duenio1: Duenio = { id: 'd1', nombre: 'Carlos Pérez', dni: '72581934', telefono: '987654321', correo: 'carlos@email.com' };
    const duenio2: Duenio = { id: 'd2', nombre: 'María López', dni: '45123678', telefono: '912345678' };
    return [
      { id: 'msc_1', nombre: 'Firulais', especie: Especie.PERRO, raza: 'Labrador', fechaNacimiento: new Date('2020-03-12'), observaciones: 'Alérgico a la penicilina', duenio: duenio1 },
      { id: 'msc_2', nombre: 'Luna', especie: Especie.GATO, raza: 'Siamés', fechaNacimiento: new Date('2021-08-05'), duenio: duenio2 },
      { id: 'msc_3', nombre: 'Max', especie: Especie.PERRO, raza: 'Golden Retriever', fechaNacimiento: new Date('2019-11-20'), duenio: duenio1 },
    ];
  }
}
