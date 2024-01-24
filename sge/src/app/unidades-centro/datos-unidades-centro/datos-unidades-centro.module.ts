import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudMaterialModule } from '../../modules/crud-material/crud-material.module'



import { DatosUnidadesCentroComponent } from './datos-unidades-centro.component';
import { DatosUnidadesCentroRoutingModule } from './datos-unidades-centro-routing.component';
import { DatosBasicosUnidadesCentroComponent } from './datos-basicos-unidades-centro/datos-basicos-unidades-centro.component';
import { AlumnosUnidadesCentroComponent } from './alumnos-unidades-centro/alumnos-unidades-centro.component';

@NgModule({
  declarations: [DatosUnidadesCentroComponent, DatosBasicosUnidadesCentroComponent, AlumnosUnidadesCentroComponent],
  imports: [
    CommonModule,
    DatosUnidadesCentroRoutingModule,
    CrudMaterialModule
  ]
})
export class DatosUnidadesCentroModule { }
