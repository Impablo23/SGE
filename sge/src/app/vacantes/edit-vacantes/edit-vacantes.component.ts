import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CiclosService } from 'src/app/services/ciclos.service';
import { EntidadesService } from 'src/app/services/entidades.service';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { VacantesService } from 'src/app/services/vacantes.service';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { Entidad } from 'src/app/shared/interfaces/entidad';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { Vacante } from 'src/app/shared/interfaces/vacante';
import { CLOSE, ENTIDAD_UNIDADES_CENTRO, ERROR } from 'src/app/shared/messages';

@Component({
  selector: 'app-edit-vacantes',
  templateUrl: './edit-vacantes.component.html',
})
export class EditVacantesComponent implements OnInit {

  vacantesForm: FormGroup;

  entidad: Entidad[];
  unidadCentro: UnidadesCentro[];

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditVacantesComponent>,
    private snackBar: MatSnackBar,
    private vacantesService: VacantesService,
    private entidadesService: EntidadesService,
    private unidadesCentroService: UnidadesCentroService,
    @Inject(MAT_DIALOG_DATA) public vacante: Vacante,

  ) { }

  ngOnInit(): void {
    this.ENTIDAD=ENTIDAD_UNIDADES_CENTRO;
    this.vacantesForm = new FormGroup({
      id_vacante: new FormControl(this.vacante.id_vacante),
      id_entidad: new FormControl(this.vacante.id_entidad, Validators.required),
      id_unidad_centro: new FormControl(this.vacante.id_unidad_centro, Validators.required),
      num_alumnos: new FormControl(this.vacante.num_alumnos, Validators.required)
    });
    this.getEntidades();
    this.getUnidadesCentro();
  }



  async confirmEdit(){
    if (this.vacantesForm.valid) {
      const familiaForm = this.vacantesForm.value;

      const RESPONSE = await this.vacantesService.editVacante(familiaForm).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
    } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }

  async getEntidades(){
    const RESPONSE = await this.entidadesService.getAllEntidades().toPromise();
    if (RESPONSE.ok){
      this.entidad = RESPONSE.data as Entidad[];
    }
  }
  async getUnidadesCentro(){
    const RESPONSE = await this.unidadesCentroService.getAllUnidadesCentro().toPromise();
    if (RESPONSE.ok){
      this.unidadCentro = RESPONSE.data as UnidadesCentro[];
    }
  }

}
