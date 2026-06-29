import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Mascota } from '../../../mascotas/models/mascota.model';
import { MascotaService } from '../../../mascotas/services/mascota.service';
import { HistorialService } from '../../services/historial.service';
import { HistorialItem } from '../../models/historial-item.model';

@Component({
  selector: 'app-historial-mascota',
  templateUrl: './historial-mascota.component.html',
  styleUrls: ['./historial-mascota.component.scss'],
  standalone: false
})
export class HistorialMascotaComponent implements OnInit {
  termino = '';
  mascotaSeleccionada: Mascota | null = null;
  resultadosBusqueda$: Observable<Mascota[]> = of([]);
  historial$: Observable<HistorialItem[]> = of([]);

  constructor(
    private mascotaService: MascotaService,
    private historialService: HistorialService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const mascotaId = this.route.snapshot.queryParamMap.get('mascotaId');
    if (mascotaId) {
      this.mascotaService.getById(mascotaId).subscribe(m => {
        if (m) this.seleccionar(m);
      });
    }
  }

  buscar(): void {
    this.resultadosBusqueda$ = this.termino.trim()
      ? this.mascotaService.buscar(this.termino)
      : of([]);
  }

  seleccionar(mascota: Mascota): void {
    this.mascotaSeleccionada = mascota;
    this.historial$ = this.historialService.getPorMascota(mascota.id);
    this.resultadosBusqueda$ = of([]);
    this.termino = '';
  }
}
