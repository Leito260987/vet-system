import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotaListComponent } from './components/mascota-list/mascota-list.component';
import { MascotaFormComponent } from './components/mascota-form/mascota-form.component';

const routes: Routes = [
  { path: '', component: MascotaListComponent },
  { path: 'nueva', component: MascotaFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MascotasRoutingModule {}
