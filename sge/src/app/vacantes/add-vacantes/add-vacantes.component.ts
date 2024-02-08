import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EntidadesService } from "src/app/services/entidades.service";
import { UnidadesCentroService } from "src/app/services/unidades-centro.service";
import { VacantesService } from "src/app/services/vacantes.service";
import { Entidad } from "src/app/shared/interfaces/entidad";
import { UnidadesCentro } from "src/app/shared/interfaces/unidades-centro";
import { Vacante } from "src/app/shared/interfaces/vacante";
import { CLOSE, INVALID_FORM } from "src/app/shared/messages";

@Component({
  selector: 'app-add-vacantes',
  templateUrl: './add-vacantes.component.html',
})
export class AddVacanteComponent implements OnInit {

  vacantesForm: FormGroup;

  entidad: Entidad[];
  unidadCentro: UnidadesCentro[];

  constructor(
    public dialogRef: MatDialogRef<AddVacanteComponent>,
    private snackBar: MatSnackBar,
    private vacantesService: VacantesService,
    private entidadesService: EntidadesService,
    private unidadesCentroService: UnidadesCentroService,
    @Inject(MAT_DIALOG_DATA) public id_vacante: number
  ) {}

  ngOnInit(): void {
    this.vacantesForm = new FormGroup({
      id_vacante: new FormControl(0),
      id_entidad: new FormControl(null, Validators.required),
      id_unidad_centro: new FormControl(null, Validators.required),
      num_alumnos: new FormControl(null, Validators.required),
    });
    this.getEntidades();
    this.getUnidadesCentro();
  }

  async confirmAdd() {
    if (this.vacantesForm.valid) {
      //agregar centro al formulario
      const vacante = this.vacantesForm.value as Vacante;
      const RESPONSE = await this.vacantesService.addVacante(vacante).toPromise();

      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
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
