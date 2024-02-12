import { Injectable } from '@angular/core';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';

import { Vacante } from '../shared/interfaces/vacante';
import { VacanteXAlumno } from '../shared/interfaces/vacanteXalumno';

const ENDPOINT = 'vacantesxalumnos';


@Injectable({
  providedIn: 'root'
})
export class VacantesXAlumnosService {


  vacanteXalumno: VacanteXAlumno;
  vacantesXalumnos: VacanteXAlumno [];

  constructor(private http: HttpClient, private commonService: CommonService) { }

  insertarAlumnosSeleccionados(id_vacante: number, idAlumnos: number[]) {
    console.log({idAlumnos})
    const body = JSON.stringify({ id_vacante: id_vacante, listadoVacantes: idAlumnos });
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  getAlumnado(id_unidad_centro: number){
    const body = JSON.stringify({id_unidad_centro: id_unidad_centro });
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php?opcion=buscar`, body, { headers: this.commonService.headers });
  }
}
