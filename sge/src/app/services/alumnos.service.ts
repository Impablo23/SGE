import { Injectable } from '@angular/core';
import { Contacto } from '../shared/interfaces/contacto';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';
import { Reunion } from '../shared/interfaces/reunion';
import { Entidad } from '../shared/interfaces/entidad';
import { Alumno } from '../shared/interfaces/alumno';

const ENDPOINT = 'alumnos';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  alumnos: Alumno[];
  alumno: Alumno;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  setAlumno(alumno: Alumno) {
    this.alumno = alumno;
  }

  setDatosBasicosAlumno(formAlumno: any) {
    this.alumno.id_alumno = formAlumno.id_alumno;
    this.alumno.id_unidad_centro = formAlumno.id_unidad_centro;
    this.alumno.nombre_completo_alumno = formAlumno.nombre_completo_alumno;
    this.alumno.fecha_nacimiento_alumno = formAlumno.fecha_nacimiento_alumno;
    this.alumno.linkedin_alumno = formAlumno.linkedin_alumno;
    this.alumno.nivel_ingles_alumno = formAlumno.nivel_ingles_alumno;
    this.alumno.minusvalia = formAlumno.minusvalia;
    this.alumno.otra_formacion = formAlumno.otra_formacion;
  }

  // // Obtener todos los alumnos
  // get(idCentro: number) {
  //   return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_unidad_centro=${idCentro}`, { headers: this.commonService.headers });
  // }

  // Obtener todos los alumnos
  getAllAlumnos(id_unidad_centro: number) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_unidad_centro=${id_unidad_centro}`, { headers: this.commonService.headers });
  }


  addAlumno(alumno: Alumno) {
    const body = JSON.stringify(alumno);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editAlumno(alumno: Alumno) {
    const body = JSON.stringify(alumno);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteAlumno(id_alumno: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_alumno=${id_alumno}`, {headers: this.commonService.headers });
  }
}
