import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Zona } from 'src/app/shared/interfaces/zona';
import { Entidad } from 'src/app/shared/interfaces/entidad';
import { Contacto } from 'src/app/shared/interfaces/contacto';
import { TipoEntidad } from '../../../shared/interfaces/tipo-entidad';
import { Provincia } from '../../../shared/interfaces/provincia';
import { ENTIDAD_ENTIDAD } from '../../../shared/messages';
import { DatosUnidadesCentroComponent } from '../datos-unidades-centro.component';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';

@Component({
  selector: 'app-datos-basicos-entidad',
  templateUrl: './datos-basicos-unidades-centro.html',
  styleUrls: ['./datos-basicos-unidades-centro.component.scss']
})
export class DatosBasicosUnidadesCentroComponent implements OnInit {

  datosBasicosForm: FormGroup;
  ciclos: Ciclo[];
  entidades: Entidad[];
  zonas: Zona[];
  tipos_entidad: TipoEntidad[];
  provincias: Provincia[];
  contactos: Contacto[];

  ENTIDAD: String;

  constructor(
    private datosUnidadCentro: DatosUnidadesCentroComponent,
    public unidadesCentroService: UnidadesCentroService,
  ) {
    this.ciclos = this.datosUnidadCentro.datosEditarUnidadCentro.ciclos;
  }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_ENTIDAD;
    this.setForm();

    this.datosBasicosForm.valueChanges.subscribe(form => {
      this.unidadesCentroService.setDatosBasicosUnidadCentro(form);
    });
  }

  setForm(): void {
    this.datosBasicosForm = new FormGroup({
      id_unidad_centro: new FormControl(this.unidadesCentroService.unidadCentro.id_unidad_centro, Validators.required),
      unidad_centro: new FormControl(this.unidadesCentroService.unidadCentro.unidad_centro, Validators.required),
      id_ciclo: new FormControl(this.unidadesCentroService.unidadCentro.id_ciclo, Validators.required),
      observaciones: new FormControl(this.unidadesCentroService.unidadCentro.obvervaciones),
      // id_entidad: new FormControl(this.entidadService.entidad.id_entidad, Validators.required),
      // entidad: new FormControl(this.entidadService.entidad.entidad, Validators.required),
      // id_zona: new FormControl(this.entidadService.entidad.id_zona, Validators.required),
      // id_contacto: new FormControl(this.entidadService.entidad.id_contacto, Validators.required),
      // id_tipo_entidad: new FormControl(this.entidadService.entidad.id_tipo_entidad, Validators.required),
      // direccion: new FormControl(this.entidadService.entidad.direccion),
      // cp: new FormControl(this.entidadService.entidad.cp),
      // localidad: new FormControl(this.entidadService.entidad.localidad),
      // id_provincia: new FormControl(this.entidadService.entidad.id_provincia),
      // telefono: new FormControl(this.entidadService.entidad.telefono),
      // email: new FormControl(this.entidadService.entidad.email),
      // web: new FormControl(this.entidadService.entidad.web),
      // codigo: new FormControl(this.entidadService.entidad.codigo),
      // observaciones: new FormControl(this.entidadService.entidad.observaciones)

    });
  }
}
