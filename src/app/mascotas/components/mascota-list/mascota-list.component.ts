import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Mascota } from '../../models/mascota.model';
import { MascotaService } from '../../services/mascota.service';

@Component({
  selector: 'app-mascota-list',
  templateUrl: './mascota-list.component.html',
  styleUrls: ['./mascota-list.component.scss'],
  standalone: false
})
export class MascotaListComponent implements OnInit {
  mascotas$!: Observable<Mascota[]>;
  terminoBusqueda = '';

  constructor(private mascotaService: MascotaService, private router: Router) {}

  ngOnInit(): void { this.mascotas$ = this.mascotaService.getAll(); }

  buscar(): void {
    this.mascotas$ = this.terminoBusqueda.trim()
      ? this.mascotaService.buscar(this.terminoBusqueda)
      : this.mascotaService.getAll();
  }

  verHistorial(mascotaId: string): void { this.router.navigate(['/historial'], { queryParams: { mascotaId } }); }
  agendar(mascotaId: string): void { this.router.navigate(['/citas/nueva'], { queryParams: { mascotaId } }); }
  editar(mascota: Mascota): void { this.router.navigate(['/mascotas/editar', mascota.id]); }

  eliminar(mascotaId: string): void {
    if (confirm('¿Eliminar esta mascota?')) this.mascotaService.eliminar(mascotaId);
  }
}
