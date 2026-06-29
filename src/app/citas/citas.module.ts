import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CitasRoutingModule } from './citas-routing.module';
import { CitaListComponent } from './components/cita-list/cita-list.component';
import { CitaFormComponent } from './components/cita-form/cita-form.component';
import { MascotasModule } from '../mascotas/mascotas.module';

@NgModule({
  declarations: [CitaListComponent, CitaFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, CitasRoutingModule, MascotasModule]
})
export class CitasModule {}
