import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CLOSE, ENTIDAD_CONTACTO, ERROR, INVALID_FORM } from 'src/app/shared/messages';

import { Alumno } from 'src/app/shared/interfaces/alumno';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { LinkedinUrlValidator } from 'src/app/shared/validators/linkedinURLValidator';

@Component({
  selector: 'app-edit-alumno',
  templateUrl: './edit-alumno.component.html',
  styleUrls: ['./edit-alumno.component.scss']
})
export class EditAlumnoComponent implements OnInit {

  alumnoForm: FormGroup;
  alumno: Alumno;

  constructor(
    public dialogRef: MatDialogRef<EditAlumnoComponent>,
    private snackBar: MatSnackBar,
    private alumnoService: AlumnosService,
    @Inject(MAT_DIALOG_DATA) public data: Alumno
  ) {
    this.alumno = { ...data };
  }

  ngOnInit() {
    this.alumnoForm = new FormGroup({
      id_alumno: new FormControl(this.alumno.id_alumno),
      id_unidad_centro: new FormControl(this.alumno.id_unidad_centro, Validators.required),
      nombre_completo_alumno: new FormControl(this.alumno.nombre_completo_alumno, Validators.required),
      fecha_nacimiento_alumno: new FormControl(this.alumno.fecha_nacimiento_alumno, Validators.required),
      documentacion_alumno: new FormControl(this.alumno.documentacion_alumno, Validators.required),
      linkedin_alumno: new FormControl(this.alumno.linkedin_alumno, Validators.required),
      nivel_ingles_alumno: new FormControl(this.alumno.nivel_ingles_alumno, Validators.required),
      minusvalia: new FormControl(this.alumno.minusvalia, Validators.required),
      otra_formacion: new FormControl(this.alumno.otra_formacion),

    });
  }

  async confirmEdit() {
    if (this.alumnoForm.valid) {
      const alumno = this.alumnoForm.value;

      try {
        const RESPONSE = await this.alumnoService.editAlumno(alumno).toPromise();

        if (RESPONSE.ok) {
          this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
          this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
        } else {
          this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        }
      } catch (error) {
        console.error('Error al editar el alumno:', error);
        this.snackBar.open('Error al editar el alumno', CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }
}
