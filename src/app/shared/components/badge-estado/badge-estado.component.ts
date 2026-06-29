import { Component, Input } from '@angular/core';
import { EstadoCita } from '../../../citas/models/cita.model';

@Component({
  selector: 'app-badge-estado',
  templateUrl: './badge-estado.component.html',
  standalone: false
})
export class BadgeEstadoComponent {
  @Input() estado!: EstadoCita;
}
