import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteContactoRoutingModule } from './delete-alumno-routing.module';
import { DeleteAlumnoComponent } from './delete-alumno.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';


@NgModule({
  declarations: [DeleteAlumnoComponent],
  imports: [
    CommonModule,
    DeleteContactoRoutingModule,
    CrudMaterialModule
  ]
})
export class DeleteAlumnoModule { }
