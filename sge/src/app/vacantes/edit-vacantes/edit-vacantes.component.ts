import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AlumnosService } from 'src/app/services/alumnos.service';
import { CiclosService } from 'src/app/services/ciclos.service';
import { EntidadesService } from 'src/app/services/entidades.service';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { VacantesService } from 'src/app/services/vacantes.service';
import { VacantesXAlumnosService } from 'src/app/services/vacantesxalumnos.service';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { Permises } from 'src/app/shared/interfaces/api-response';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { Entidad } from 'src/app/shared/interfaces/entidad';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { Vacante } from 'src/app/shared/interfaces/vacante';
import { CLOSE, ENTIDAD_UNIDADES_CENTRO, ERROR } from 'src/app/shared/messages';

@Component({
  selector: 'app-edit-vacantes',
  templateUrl: './edit-vacantes.component.html',
  styleUrls: ['./edit-vacantes.component.scss']
})
export class EditVacantesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Alumno> = new MatTableDataSource();

  AlumnoFilter = new FormControl();
  nombreCompletoFilter = new FormControl();

  alumno: Alumno;

  permises: Permises;

  selection: SelectionModel<Alumno>;

  displayedColumns: string[];
  private filterValues = {id_alumno: '',nombre_completo_alumno: ''};


  vacantesForm: FormGroup;

  entidad: Entidad[];
  entidadActual: Vacante;
  unidadCentro: UnidadesCentro[];


  listadoAlumnos: Alumno[];
  listadoVacantes: Alumno[];


  ENTIDAD: String;


  constructor(
    public dialogRef: MatDialogRef<EditVacantesComponent>,
    private snackBar: MatSnackBar,
    private vacantesService: VacantesService,
    private entidadesService: EntidadesService,
    private unidadesCentroService: UnidadesCentroService,
    private alumnosService: AlumnosService,
    private vacantesXalumnosService: VacantesXAlumnosService,
    @Inject(MAT_DIALOG_DATA) public vacante: Vacante,

  ) {
    this.listadoAlumnos = [];
    this.listadoVacantes = [];
   }

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
    this.getAlumnos(this.vacante.id_unidad_centro);
  }

  async getAlumnos(id_unidad_centro: number) {
    const RESPONSE = await this.alumnosService.getAllAlumnos(id_unidad_centro).toPromise();
    //this.permises = RESPONSE.permises;
    console.log(RESPONSE)
    if (RESPONSE.ok) {
      this.listadoAlumnos = RESPONSE.data as Alumno[];
    }

  }

  async confirmEdit(){
    if (this.vacantesForm.valid) {
      const familiaForm = this.vacantesForm.value;

      const idAlumnos : number [] = this.listadoVacantes.map(alumno => {
        return alumno.id_alumno;
      });
      console.log(idAlumnos);

      const RESPONSE = await this.vacantesService.editVacante(familiaForm).toPromise();
      if (RESPONSE.ok) {
        const RESPONSE2 = await this.vacantesXalumnosService.insertarAlumnosSeleccionados(this.vacante.id_vacante, idAlumnos).toPromise()
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

  async seleccionarAlumno(alumno: Alumno) {
    // este if para controlar el numero de vacantes que pueden entrar en el listado
    if (this.listadoVacantes.length<this.vacante.num_alumnos){
      this.listadoVacantes.push(alumno);

      const index = this.listadoAlumnos.indexOf(alumno);
      if (index !== -1) {
        this.listadoAlumnos.splice(index, 1);
      }
    }

  }

  async quitarAlumno(alumno: Alumno) {
    // Se quita el alumno de la lista de seleccionados
    const index = this.listadoVacantes.indexOf(alumno);
    if (index !== -1) {
      this.listadoVacantes.splice(index, 1);
    }
    // Se devuelve a lista de la unidad
    //if (!this.alumnadoUnidadElegida.includes(alumno)) {
      this.listadoAlumnos.push(alumno);
    //}
  }

}
