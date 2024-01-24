import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AlumnosUnidadesCentroComponent } from './alumnos-unidades-centro.component';

const routes: Routes = [
  { path: '', component: AlumnosUnidadesCentroComponent },
  {
    path: 'add-alumno',
    loadChildren: () => import('./add-contacto/add-contacto.module').then(m => m.AddContactoModule)
  },
  {
    path: 'edit-alumno',
    loadChildren: () => import('./edit-contacto/edit-contacto.module').then(m => m.EditContactoModule)
  },
  {
    path: 'delete-alumno',
    loadChildren: () => import('./delete-contacto/delete-contacto.module').then(m => m.DeleteContactoModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosUnidadesCentroRoutingModule { }
