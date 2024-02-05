import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent} from './alumnos.component';
import { CrudMaterialModule } from '../../../modules/crud-material/crud-material.module';
import { DatosBasicosEntidadModule } from 'src/app/entidades/datos-entidad/datos-basicos-entidad/datos-basicos-entidad.module';
import { AddAlumnoComponent } from './add-alumno/add-alumno.component';
import { DeleteAlumnoComponent } from './delete-alumno/delete-alumno.component';
import { EditAlumnoComponent } from './edit-alumno/edit-alumno.component';
import { LinkedinUrlPipe } from 'src/app/shared/pipes/linkedinURL.pipe';


@NgModule({
  declarations: [AlumnosComponent, AddAlumnoComponent, DeleteAlumnoComponent, EditAlumnoComponent, LinkedinUrlPipe],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    CrudMaterialModule,
    DatosBasicosEntidadModule
  ]
})
export class AlumnosModule { }
