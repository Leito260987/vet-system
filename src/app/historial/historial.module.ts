import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HistorialRoutingModule } from './historial-routing.module';
import { HistorialMascotaComponent } from './components/historial-mascota/historial-mascota.component';
import { MascotasModule } from '../mascotas/mascotas.module';

@NgModule({
  declarations: [HistorialMascotaComponent],
  imports: [CommonModule, FormsModule, SharedModule, HistorialRoutingModule, MascotasModule]
})
export class HistorialModule {}
