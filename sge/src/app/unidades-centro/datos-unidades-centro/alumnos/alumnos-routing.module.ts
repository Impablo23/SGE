import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnosComponent } from './alumnos.component';

const routes: Routes = [
  { path: '', component: AlumnosComponent },
  {
    path: 'add-contacto',
    loadChildren: () => import('./add-alumno/add-alumno.module').then(m => m.AddAlumnoModule)
  },
  {
    path: 'edit-contacto',
    loadChildren: () => import('./edit-alumno/edit-alumno.module').then(m => m.EditAlumnoModule)
  },
  {
    path: 'delete-contacto',
    loadChildren: () => import('./delete-alumno/delete-alumno.module').then(m => m.DeleteAlumnoModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
