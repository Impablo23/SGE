import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent} from './alumnos.component';
import { CrudMaterialModule } from '../../../modules/crud-material/crud-material.module';
import { DatosBasicosEntidadModule } from 'src/app/entidades/datos-entidad/datos-basicos-entidad/datos-basicos-entidad.module';


@NgModule({
  declarations: [AlumnosComponent],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    CrudMaterialModule,
    DatosBasicosEntidadModule
  ]
})
export class AlumnosModule { }
