import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'mascotas', loadChildren: () => import('./mascotas/mascotas.module').then(m => m.MascotasModule), canActivate: [AuthGuard] },
  { path: 'citas', loadChildren: () => import('./citas/citas.module').then(m => m.CitasModule), canActivate: [AuthGuard] },
  { path: 'historial', loadChildren: () => import('./historial/historial.module').then(m => m.HistorialModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
