import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mascota } from '../../../mascotas/models/mascota.model';
import { Cita, EstadoCita } from '../../../citas/models/cita.model';
import { MascotaService } from '../../../mascotas/services/mascota.service';
import { CitaService } from '../../../citas/services/cita.service';

interface DashboardStats {
  totalMascotas: number;
  citasHoy: number;
  citasPendientes: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  stats$!: Observable<DashboardStats>;
  citasRecientes$!: Observable<Cita[]>;
  mascotasRecientes$!: Observable<Mascota[]>;

  constructor(
    private mascotaService: MascotaService,
    private citaService: CitaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stats$ = combineLatest([
      this.mascotaService.getAll(),
      this.citaService.getCitasHoy(),
      this.citaService.getAll()
    ]).pipe(map(([mascotas, citasHoy, todasCitas]) => ({
      totalMascotas: mascotas.length,
      citasHoy: citasHoy.length,
      citasPendientes: todasCitas.filter(c => c.estado === EstadoCita.PENDIENTE).length
    })));

    this.citasRecientes$ = this.citaService.getAll().pipe(
      map(citas => citas.slice(0, 5))
    );

    this.mascotasRecientes$ = this.mascotaService.getAll().pipe(
      map(m => m.slice(0, 3))
    );
  }

  verHistorial(mascotaId: string): void { this.router.navigate(['/historial'], { queryParams: { mascotaId } }); }
  agendar(mascotaId: string): void { this.router.navigate(['/citas/nueva'], { queryParams: { mascotaId } }); }
  editar(mascota: Mascota): void { this.router.navigate(['/mascotas/editar', mascota.id]); }
}
