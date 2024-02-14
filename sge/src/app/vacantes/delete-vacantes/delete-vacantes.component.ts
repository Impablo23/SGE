import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { VacantesService } from 'src/app/services/vacantes.service';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { Vacante } from 'src/app/shared/interfaces/vacante';
import { CLOSE, ENTIDAD_UNIDADES_CENTRO } from 'src/app/shared/messages';

@Component({
  selector: 'app-delete-vacantes',
  templateUrl: './delete-vacantes.component.html',
})
export class DeleteVacantesComponent implements OnInit {

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteVacantesComponent>,
    @Inject(MAT_DIALOG_DATA) public vacante: Vacante,
    public vacantesService: VacantesService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.ENTIDAD = 'Vacante';
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    const RESPONSE = await this.vacantesService.deleteVacante(this.vacante.id_vacante).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
    } else { this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }

}
