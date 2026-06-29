import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitaListComponent } from './components/cita-list/cita-list.component';
import { CitaFormComponent } from './components/cita-form/cita-form.component';

const routes: Routes = [
  { path: '', component: CitaListComponent },
  { path: 'nueva', component: CitaFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule {}
