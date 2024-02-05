import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DatosUnidadesCentroRoutingModule } from './datos-unidades-centro-routing.module';
import { DatosUnidadesCentroComponent } from './datos-unidades-centro.component';
//import { CrudMaterialModule } from '../../modules/crud-material/crud-material.module';
import { CrudMaterialModule } from '../../modules/crud-material/crud-material.module'
// import { UnidadesCentroModule } from '../unidades-centro.module';
// import { AlumnosModule } from './alumnos/alumnos.module';


@NgModule({
  declarations: [DatosUnidadesCentroComponent],
  imports: [
    CommonModule,
    DatosUnidadesCentroRoutingModule,
    CrudMaterialModule
  ]
})
export class DatosUnidadCentroModule { }
