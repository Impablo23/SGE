import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CrudMaterialModule } from '../../../modules/crud-material/crud-material.module';
import { DatosBasicosUnidadesCentroComponent } from '../datos-basicos-unidades-centro/datos-basicos-unidades-centro.component';
import { AlumnosUnidadesCentroRoutingModule } from './alumnos-unidades-centro-routing.module';


@NgModule({
  declarations: [DatosBasicosUnidadesCentroComponent],
  imports: [
    CommonModule,
    AlumnosUnidadesCentroRoutingModule,
    CrudMaterialModule
  ]
})
export class AlumnosUnidadesCentroModule { }
