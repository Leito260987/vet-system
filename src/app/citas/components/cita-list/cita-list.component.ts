import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cita, EstadoCita } from '../../models/cita.model';
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-cita-list',
  templateUrl: './cita-list.component.html',
  styleUrls: ['./cita-list.component.scss'],
  standalone: false
})
export class CitaListComponent implements OnInit {
  citas$!: Observable<Cita[]>;
  filtroEstado: string = '';
  estadosCita = ['', ...Object.values(EstadoCita)];
  EstadoCita = EstadoCita;
  citaParaCancelar: Cita | null = null;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void { this.cargarCitas(); }

  cargarCitas(): void {
    this.citas$ = this.filtroEstado
      ? this.citaService.getAll().pipe(map(citas => citas.filter(c => c.estado === this.filtroEstado)))
      : this.citaService.getAll();
  }

  confirmarCancelacion(cita: Cita): void { this.citaParaCancelar = cita; }

  cancelar(): void {
    if (this.citaParaCancelar) {
      this.citaService.cambiarEstado(this.citaParaCancelar.id, EstadoCita.CANCELADA);
      this.citaParaCancelar = null;
    }
  }

  confirmar(id: string): void { this.citaService.cambiarEstado(id, EstadoCita.CONFIRMADA); }
  completar(id: string): void { this.citaService.cambiarEstado(id, EstadoCita.COMPLETADA); }
}
