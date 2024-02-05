import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CLOSE, ENTIDAD_ENTIDAD, ENTIDAD_UNIDADES_CENTRO, ERROR } from '../../../shared/messages';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { CiclosService } from 'src/app/services/ciclos.service';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';

@Component({
  selector: 'app-datos-basicos-unidades-centro',
  templateUrl: './datos-basicos-unidades-centro.html',
  styleUrls: ['./datos-basicos-unidades-centro.component.scss']
})
export class DatosBasicosUnidadesCentroComponent implements OnInit {

  unidadesCentroForm: FormGroup;

 ciclo : Ciclo[];

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DatosBasicosUnidadesCentroComponent>,
    private snackBar: MatSnackBar,
    private servicioUnidadesCentro: UnidadesCentroService,
    @Inject(MAT_DIALOG_DATA) public unidadesCentro: UnidadesCentro,
    private servicioCiclos: CiclosService
  ) { }

  ngOnInit(): void {
    this.ENTIDAD=ENTIDAD_UNIDADES_CENTRO;
    this.unidadesCentroForm = new FormGroup({
      id_unidad_centro: new FormControl(this.unidadesCentro.id_unidad_centro, Validators.required),
      unidad_centro: new FormControl(this.unidadesCentro.unidad_centro, Validators.required),
      id_ciclo: new FormControl(this.unidadesCentro.id_ciclo, Validators.required),
      observaciones: new FormControl(this.unidadesCentro.obvervaciones)
    });
    this.getCiclos();
  }

  async getCiclos(){
    const RESPONSE = await this.servicioCiclos.getAllCiclos().toPromise();
    if (RESPONSE.ok){
      this.ciclo = RESPONSE.data as Ciclo[];
    }
  }

  async confirmEdit(){
    if (this.unidadesCentroForm.valid) {
      const familiaForm = this.unidadesCentroForm.value;

      const RESPONSE = await this.servicioUnidadesCentro.editUnidadesCentro(familiaForm).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
    } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }
}
