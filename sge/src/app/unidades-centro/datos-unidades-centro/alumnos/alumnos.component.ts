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
  selector: 'app-contactos-entidad',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Alumno> = new MatTableDataSource();

  idAlumnoFilter = new FormControl();
  idUnidadCentroFilter = new FormControl();
  nombreCompletoFilter = new FormControl();
  edadFilter = new FormControl();
  linkedinFilter = new FormControl();


  alumno: Alumno;

  permises: Permises;

  selection: SelectionModel<Alumno>;

  displayedColumns: string[];
  private filterValues = { id_alumno: '', id_unidad_centro: '', nombre_completo_alumno: '', fecha_nacimiento_alumno: '', linkedin_alumno: '' };

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

  async getAlumnos(id: number) {
    const RESPONSE = await this.alumnosService.get(id).toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.alumnosService.alumnos = RESPONSE.data as Alumno[];
      this.displayedColumns = ['id_alumno','id_unidad_centro','nombre_completo_alumno','fecha_nacimiento_alumno','linkedin_alumno'];
      this.dataSource.data = this.alumnosService.alumnos;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }
  }

  async addAlumno() {
    const dialogRef = this.dialog.open(AddAlumnoComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.unidadDual.push(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }
  }

  async editAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(EditAlumnoComponent, { data: alumno, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
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
        //this.unidadesDualService.deleteUnidadDual(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }
  }

  createFilter(): (alumno: Alumno, filter: string) => boolean {
    const filterFunction = (alumno: Alumno, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      if(alumno.otra_formacion==null){
        alumno.otra_formacion="";
      }
      return alumno.id_alumno.toString().indexOf(searchTerms.id_alumno) !== -1
        && alumno.id_unidad_centro.toString().indexOf(searchTerms.id_unidad_centro) !== -1
        && alumno.nombre_completo_alumno.toString().indexOf(searchTerms.nombre_completo_alumno) !== -1
        && alumno.fecha_nacimiento_alumno.toString().indexOf(searchTerms.fecha_nacimiento_alumno) !== -1
        && alumno.linkedin_alumno.toString().indexOf(searchTerms.linkedin_alumno) !== -1

    };

    return filterFunction;
  }

  onChanges() {
    this.idAlumnoFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_alumno = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.idUnidadCentroFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_alumno = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.nombreCompletoFilter.valueChanges
    .subscribe(value => {
        this.filterValues.nombre_completo_alumno = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.edadFilter.valueChanges
    .subscribe(value => {
        this.filterValues.fecha_nacimiento_alumno = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.linkedinFilter.valueChanges
    .subscribe(value => {
        this.filterValues.linkedin_alumno = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }


  public linkedin(url: string): void {
    window.open(url)
  }


  public calcularEdad(fechaNacimiento: Date): number {
    const fechaActual = new Date();
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

    // Ajustar la edad si aún no ha sido el cumpleaños en el año actual
    if (
        fechaNacimiento.getMonth() > fechaActual.getMonth() ||
        (fechaNacimiento.getMonth() === fechaActual.getMonth() &&
            fechaNacimiento.getDate() > fechaActual.getDate())
    ) {
        edad--;
    }

    return edad;
}






}
