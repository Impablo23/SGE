import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { Permises } from 'src/app/shared/interfaces/api-response';

import { AddAlumnoComponent } from './add-alumno/add-alumno.component';
import { EditAlumnoComponent } from './edit-alumno/edit-alumno.component';
import { DeleteAlumnoComponent } from './delete-alumno/delete-alumno.component';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Alumno> = new MatTableDataSource();

  idAlumnoFilter = new FormControl();
  nombreCompletoFilter = new FormControl();
  FechaFilter = new FormControl();
  linkedinFilter = new FormControl();

  listadoAlumnos: Alumno[]


  alumno: Alumno;

  permises: Permises;

  selection: SelectionModel<Alumno>;

  displayedColumns: string[];
  private filterValues = {id_alumno: '',nombre_completo_alumno: '', fecha_nacimiento_alumno: '', linkedin_alumno: ''};

  constructor(
    public dialog: MatDialog,
    private alumnosService: AlumnosService,
    private overlay: Overlay,
    @Inject(MAT_DIALOG_DATA) public unidadCentro: UnidadesCentro

  ) { }

  ngOnInit(): void {
    this.getAlumnos(this.unidadCentro.id_unidad_centro);
    //this.createFilter();
    //this.onChanges();
  }

  async getAlumnos(id_unidad_centro: number) {
    const RESPONSE = await this.alumnosService.getAllAlumnos(id_unidad_centro).toPromise();
    //this.permises = RESPONSE.permises;
    console.log(RESPONSE)
    if (RESPONSE.ok) {
      this.alumnosService.alumnos = RESPONSE.data as Alumno[];
      this.displayedColumns = ['id_alumno','nombre_completo_alumno','fecha_nacimiento_alumno','linkedin_alumno','actions'];
      this.dataSource.data = this.alumnosService.alumnos;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.selection = new SelectionModel<Alumno>(false, [this.alumno]);
      this.onChanges();
    }

  }

  async addAlumno() {
    const dialogRef = this.dialog.open(AddAlumnoComponent, { data: this.unidadCentro.id_unidad_centro, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.alumnosService.alumnos.push(RESULT.data);
        this.dataSource.data = this.alumnosService.alumnos;
        this.getAlumnos(this.unidadCentro.id_unidad_centro);
        //this.unidadesDualService.unidadDual.push(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;

      }
    }
  }

  async editAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(EditAlumnoComponent, { data: alumno, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.dataSource.data = this.alumnosService.alumnos;
        this.getAlumnos(this.unidadCentro.id_unidad_centro);
        //this.unidadesDualService.editUnidadDual(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }
  }

  async deleteAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(DeleteAlumnoComponent, { data: alumno, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.dataSource.data = this.alumnosService.alumnos;
        this.getAlumnos(this.unidadCentro.id_unidad_centro);
        //this.unidadesDualService.deleteUnidadDual(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }
  }

  createFilter(): (alumno: Alumno, filter: string) => boolean {
    const filterFunction = (alumno: Alumno, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return alumno.nombre_completo_alumno.toString().indexOf(searchTerms.nombre_completo_alumno) !== -1
      && alumno.fecha_nacimiento_alumno.toString().indexOf(searchTerms.fecha_nacimiento_alumno) !== -1
      && alumno.id_alumno.toString().indexOf(searchTerms.fecha_nacimiento_alumno) !== -1
      && alumno.linkedin_alumno.toString().indexOf(searchTerms.fecha_nacimiento_alumno) !== -1

    };

    return filterFunction;
  }

  onChanges() {

    this.nombreCompletoFilter.valueChanges
    .subscribe(value => {
        this.filterValues.nombre_completo_alumno = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

     this.FechaFilter.valueChanges
    .subscribe(value => {
        this.filterValues.fecha_nacimiento_alumno = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.linkedinFilter.valueChanges
    .subscribe(value => {
        this.filterValues.linkedin_alumno = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.idAlumnoFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_alumno = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });


  }


}
