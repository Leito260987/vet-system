import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MascotasRoutingModule } from './mascotas-routing.module';
import { MascotaListComponent } from './components/mascota-list/mascota-list.component';
import { MascotaFormComponent } from './components/mascota-form/mascota-form.component';
import { MascotaCardComponent } from './components/mascota-card/mascota-card.component';

@NgModule({
  declarations: [MascotaListComponent, MascotaFormComponent, MascotaCardComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, MascotasRoutingModule],
  exports: [MascotaCardComponent]
})
export class MascotasModule {}
