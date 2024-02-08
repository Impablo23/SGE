import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { VacantesRoutingModule } from './vacantes-routing.module';
import { VacantesComponent } from './vacantes.component';
import { AddVacanteComponent } from './add-vacantes/add-vacantes.component';
import { DeleteVacantesComponent } from './delete-vacantes/delete-vacantes.component';
import { EditVacantesComponent } from './edit-vacantes/edit-vacantes.component';

@NgModule({
  declarations: [VacantesComponent, AddVacanteComponent, DeleteVacantesComponent, EditVacantesComponent],
  imports: [
    CommonModule,
    CrudMaterialModule,
    VacantesRoutingModule

  ]
})
export class VacantesModule { }
