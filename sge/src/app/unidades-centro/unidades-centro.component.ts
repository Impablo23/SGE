import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Permises } from '../shared/interfaces/api-response';
import { UnidadesCentro } from '../shared/interfaces/unidades-centro';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { UnidadesCentroService } from '../services/unidades-centro.service';
import { AddUnidadesCentroComponent } from './add-unidades-centro/add-unidades-centro.component';
import { EditUnidadesCentroComponent } from './edit-unidades-centro/edit-unidades-centro.component';
import { DeleteUnidadesCentroComponent } from './delete-unidades-centro/delete-unidades-centro.component';

@Component({
  selector: 'app-unidades-centro',
  templateUrl: './unidades-centro.component.html',
  styleUrls: ['./unidades-centro.component.scss']
})
export class UnidadesCentroComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<UnidadesCentro> = new MatTableDataSource();

  idUnidadesCentroFilter = new FormControl();
  unidadesCentroFilter = new FormControl();
  filtroObservaciones = new FormControl();
  idClicoFilter = new FormControl();

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_unidad_centro: '', unidad_centro: '' ,id_ciclo: '',observaciones: ''};



  constructor(
    public dialog: MatDialog,
    private unidadesCentroService: UnidadesCentroService,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getUnidadesCentro();
  }

  async getUnidadesCentro() {
    const RESPONSE = await this.unidadesCentroService.getAllUnidadesCentro().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.unidadesCentroService.unidadesCentro = RESPONSE.data as UnidadesCentro[];
      this.displayedColumns = ['id_unidad_centro', 'unidad_centro','id_ciclo', 'observaciones','actions'];
      this.dataSource.data = this.unidadesCentroService.unidadesCentro;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }
  }

  async addUnidadesCentro() {
    const dialogRef = this.dialog.open(AddUnidadesCentroComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.unidadDual.push(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }
  }

  async editUnidadesCentro(unidadesCentro: UnidadesCentro) {
    const dialogRef = this.dialog.open(EditUnidadesCentroComponent, { data: unidadesCentro, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.editUnidadDual(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }
  }

  async deleteUnidadesCentro(unidadesCentro: UnidadesCentro) {
    const dialogRef = this.dialog.open(DeleteUnidadesCentroComponent, { data: unidadesCentro, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.deleteUnidadDual(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }
  }

  createFilter(): (unidadesCentro: UnidadesCentro, filter: string) => boolean {
    const filterFunction = (unidadesCentro: UnidadesCentro, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return unidadesCentro.id_unidad_centro.toString().indexOf(searchTerms.id_unidad_centro) !== -1
        && unidadesCentro.unidad_centro.toLowerCase().indexOf(searchTerms.unidad_centro.toLowerCase()) !== -1
        && unidadesCentro.id_ciclo.toString().indexOf(searchTerms.id_ciclo) !== -1
        && unidadesCentro.obvervaciones.toLowerCase().indexOf(searchTerms.observaciones.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges() {
    this.idUnidadesCentroFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_unidad_centro = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.unidadesCentroFilter.valueChanges
    .subscribe(value => {
        this.filterValues.unidad_centro = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.idClicoFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_ciclo = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.filtroObservaciones.valueChanges
    .subscribe(value => {
        this.filterValues.observaciones = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
}

}
