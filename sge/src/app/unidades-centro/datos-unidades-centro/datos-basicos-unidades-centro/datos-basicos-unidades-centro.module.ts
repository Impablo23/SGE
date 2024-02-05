import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DatosBasicosUnidadesCentroComponent } from './datos-basicos-unidades-centro.component';
import { CrudMaterialModule } from '../../../modules/crud-material/crud-material.module';
import { DatosBasicosUnidadesCentroRoutingModule } from './datos-basicos-unidades-centro-routing.module';
// import { UnidadesCentroModule } from '../../unidades-centro.module';
// import { AlumnosModule } from '../alumnos/alumnos.module';


@NgModule({
  declarations: [DatosBasicosUnidadesCentroComponent],
  imports: [
    CommonModule,
    DatosBasicosUnidadesCentroRoutingModule,
    CrudMaterialModule
  ]
})
export class DatosBasicosUnidadesCentroModule { }
