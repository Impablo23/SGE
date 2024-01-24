import { DatosUnidadesCentroComponent } from './datos-unidades-centro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: DatosUnidadesCentroComponent,
    redirectTo: 'datos-entidad-reunion'
  },
  {
    path: 'datos-basicos-unidades-centro',
    loadChildren: () => import('./datos-basicos-unidades-centro/datos-basicos-unidades-centro.module').then(m => m.DatosBasicosUnidadesCentroModule),
    outlet: 'sidebar'
  },
  {
    path: 'alumnos-unidades-centro',
    loadChildren: () => import('./alumnos-unidades-centro/alumnos-unidades-centro.module').then(m => m.AlumnosUnidadesCentroModule),
    outlet: 'sidebar'
  },];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosUnidadesCentroRoutingModule { }
