import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialMascotaComponent } from './components/historial-mascota/historial-mascota.component';

const routes: Routes = [{ path: '', component: HistorialMascotaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialRoutingModule {}
