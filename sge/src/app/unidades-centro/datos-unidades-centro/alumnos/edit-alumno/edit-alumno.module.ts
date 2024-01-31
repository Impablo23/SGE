import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditContactoRoutingModule } from './edit-alumno-routing.module';
import { EditAlumnoComponent } from './edit-alumno.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';


@NgModule({
  declarations: [EditAlumnoComponent],
  imports: [
    CommonModule,
    EditContactoRoutingModule,
    CrudMaterialModule
  ]
})
export class EditAlumnoModule { }
