import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAlumnoComponent } from './edit-alumno.component';

const routes: Routes = [{ path: '', component: EditAlumnoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditContactoRoutingModule { }
