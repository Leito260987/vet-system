import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Mascota } from '../../models/mascota.model';

/**
 * MascotaCardComponent — tarjeta reutilizable de mascota.
 * Usado en mascota-list, dashboard e historial.
 * @Input mascota datos de la mascota
 * @Input mostrarAcciones mostrar botones de acción
 * @Input modoCompacto vista reducida
 * @Output onVerHistorial emite ID al ver historial
 * @Output onAgendar emite ID al agendar cita
 * @Output onEditar emite la mascota completa al editar
 */
@Component({
  selector: 'app-mascota-card',
  templateUrl: './mascota-card.component.html',
  styleUrls: ['./mascota-card.component.scss'],
  standalone: false
})
export class MascotaCardComponent {
  @Input() mascota!: Mascota;
  @Input() mostrarAcciones: boolean = true;
  @Input() modoCompacto: boolean = false;

  @Output() onVerHistorial = new EventEmitter<string>();
  @Output() onAgendar = new EventEmitter<string>();
  @Output() onEditar = new EventEmitter<Mascota>();

  verHistorial(): void { this.onVerHistorial.emit(this.mascota.id); }
  agendar(): void { this.onAgendar.emit(this.mascota.id); }
  editar(): void { this.onEditar.emit(this.mascota); }

  getIcono(): string {
    if (this.mascota.especie === 'Perro') return '🐕';
    if (this.mascota.especie === 'Gato') return '🐈';
    return '🐾';
  }
}
