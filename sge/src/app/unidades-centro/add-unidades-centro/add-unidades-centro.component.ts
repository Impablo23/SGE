import { Ciclo } from './../../shared/interfaces/ciclo';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CiclosService } from 'src/app/services/ciclos.service';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { CLOSE, ENTIDAD_UNIDADES_CENTRO, INVALID_FORM } from 'src/app/shared/messages';

@Component({
  selector: 'app-add-unidades-centro',
  templateUrl: './add-unidades-centro.component.html',
  styleUrls: ['./add-unidades-centro.component.scss']
})
export class AddUnidadesCentroComponent implements OnInit {

  unidadesCentroForm: FormGroup;

  ciclo : Ciclo[];

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<AddUnidadesCentroComponent>,
    private snackBar: MatSnackBar,
    private servicioUnidadesCentro: UnidadesCentroService,
    private servicioCiclos: CiclosService
  ) { }

  ngOnInit(): void {
    this.unidadesCentroForm = new FormGroup({
      unidad_centro: new FormControl(null, Validators.required),
      id_ciclo: new FormControl(null, Validators.required),
      observaciones: new FormControl(null)

    });
    this.getCiclos();
    this.ENTIDAD = ENTIDAD_UNIDADES_CENTRO
  }

  async confirmAdd() {
    if (this.unidadesCentroForm.valid) {
      const unidadesCentro = this.unidadesCentroForm.value as UnidadesCentro;

      const RESPONSE = await this.servicioUnidadesCentro.addUnidadesCentro(unidadesCentro).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
      } else {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  async getCiclos(){
    const RESPONSE = await this.servicioCiclos.getAllCiclos().toPromise();
    if (RESPONSE.ok){
      this.ciclo = RESPONSE.data as Ciclo[];
    }
  }

  onNoClick() {
    this.dialogRef.close({ok: false});
  }

}
