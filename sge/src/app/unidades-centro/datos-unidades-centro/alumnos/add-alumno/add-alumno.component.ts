import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contacto } from 'src/app/shared/interfaces/contacto';
import { ContactosService } from 'src/app/services/contactos.service';
import { CLOSE, INVALID_FORM, ENTIDAD_CONTACTO } from 'src/app/shared/messages';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { Provincia } from 'src/app/shared/interfaces/provincia';
import { ZonasService } from 'src/app/services/zonas.service';
import { Zona } from 'src/app/shared/interfaces/zona';
import { EntidadesService } from 'src/app/services/entidades.service';
import { Entidad } from 'src/app/shared/interfaces/entidad';
import { FamiliasService } from 'src/app/services/familias.service';
import { Familia } from 'src/app/shared/interfaces/familia';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { LinkedinUrlValidator } from 'src/app/shared/validators/linkedinURLValidator';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.component.html',
  styleUrls: ['./add-alumno.component.scss']
})
export class AddAlumnoComponent implements OnInit {
  alumnoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddAlumnoComponent>,
    private snackBar: MatSnackBar,
    private alumnoService: AlumnosService,
    @Inject(MAT_DIALOG_DATA) public id_unidad_centro: number
  ) {}

  ngOnInit() {
    this.alumnoForm = new FormGroup({
      id_alumno: new FormControl(0),
      id_unidad_centro: new FormControl(this.id_unidad_centro),
      nombre_completo_alumno: new FormControl(null, Validators.required),
      fecha_nacimiento_alumno: new FormControl(null, Validators.required),
      documentacion_alumno: new FormControl(null, Validators.required),
      linkedin_alumno: new FormControl(null,Validators.required),
      nivel_ingles_alumno: new FormControl(null, Validators.required),
      minusvalia: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      otra_formacion: new FormControl(null),
    });
  }

  async confirmAdd() {
    if (this.alumnoForm.valid) {
      //agregar centro al formulario
      const alumno = this.alumnoForm.value as Alumno;
      const RESPONSE = await this.alumnoService.addAlumno(alumno).toPromise();

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
}
