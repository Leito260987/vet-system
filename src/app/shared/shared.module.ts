import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EstadoCitaPipe } from './pipes/estado-cita.pipe';
import { EdadMascotaPipe } from './pipes/edad-mascota.pipe';
import { ResaltarCitaProximaDirective } from './directives/resaltar-cita-proxima.directive';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BadgeEstadoComponent } from './components/badge-estado/badge-estado.component';

@NgModule({
  declarations: [
    EstadoCitaPipe,
    EdadMascotaPipe,
    ResaltarCitaProximaDirective,
    AutoFocusDirective,
    NavbarComponent,
    BadgeEstadoComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    EstadoCitaPipe,
    EdadMascotaPipe,
    ResaltarCitaProximaDirective,
    AutoFocusDirective,
    NavbarComponent,
    BadgeEstadoComponent,
    CommonModule
  ]
})
export class SharedModule {}
