import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Vacante } from "../shared/interfaces/vacante";
import { MatTableDataSource } from "@angular/material/table";
import { FormControl } from "@angular/forms";
import { Permises } from "../shared/interfaces/api-response";
import { SelectionModel } from "@angular/cdk/collections";
import { MatDialog } from "@angular/material/dialog";
import { VacantesService } from "../services/vacantes.service";
import { Overlay } from "@angular/cdk/overlay";
import { UnidadesCentroService } from "../services/unidades-centro.service";
import { EntidadesService } from "../services/entidades.service";
import { DeleteVacantesComponent } from "./delete-vacantes/delete-vacantes.component";
import { AddVacanteComponent } from "./add-vacantes/add-vacantes.component";
import { EditVacantesComponent } from "./edit-vacantes/edit-vacantes.component";

@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.scss']
})
export class VacantesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Vacante> = new MatTableDataSource();

  idEntidadFilter = new FormControl();
  idUnidadCentroFilter = new FormControl();
  NumAlumnosFilter = new FormControl();

  permises: Permises;

  selection: SelectionModel<Vacante>;
  vacante: Vacante;

  displayedColumns: string[];
  private filterValues: {id_entidad: '', id_unidad_centro: '', num_alumnos: ''};

  constructor(
    public dialog: MatDialog,
    private vacantesService: VacantesService,
    private overlay: Overlay,
    private unidadesCentroService: UnidadesCentroService,
    private entidadesService: EntidadesService,
  ){}

  ngOnInit(): void {
    this.getVacantes();
  }

  async getVacantes(){

    const RESPONSE = await this.vacantesService.getVacantes().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.vacantesService.vacantes = RESPONSE.data as Vacante[];
      this.displayedColumns = ['id_entidad', 'id_unidad_centro','num_alumnos','actions'];
      this.dataSource.data = this.vacantesService.vacantes;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }

  }

  async addVacante() {
    const dialogRef = this.dialog.open(AddVacanteComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.unidadDual.push(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }
  }

  async editVacante(vacante: Vacante) {
    const dialogRef = this.dialog.open(EditVacantesComponent, { data: vacante, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.editUnidadDual(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }
  }

  async deleteVacante(vacante: Vacante) {
    const dialogRef = this.dialog.open(DeleteVacantesComponent, { data: vacante, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.deleteUnidadDual(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }
  }


  createFilter(): (data: Vacante, filter: string) => boolean {
    const filterFunction = (vacante: Vacante, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return vacante.id_entidad.toString().indexOf(searchTerms.id_entidad) !== -1
        && vacante.id_unidad_centro.toString().indexOf(searchTerms.id_unidad_centro) !== -1
        && vacante.num_alumnos.toString().indexOf(searchTerms.num_alumnos) !== -1

    };
    return filterFunction;
  }

  onChanges() {
    this.idEntidadFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_entidad = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.idUnidadCentroFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_unidad_centro = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.NumAlumnosFilter.valueChanges
    .subscribe(value => {
        this.filterValues.num_alumnos = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

  }

}
