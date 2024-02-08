import { Injectable } from '@angular/core';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';

import { Vacante } from '../shared/interfaces/vacante';

const ENDPOINT = 'vacantes';


@Injectable({
  providedIn: 'root'
})
export class VacantesService {


  vacantes: Vacante[];
  vacante: Vacante;

  constructor(private http: HttpClient, private commonService: CommonService) { }


  setVacante(vacante: Vacante) {
    this.vacante = vacante;
  }

  setDatosVacantes(forEntidad: any) {
    this.vacante.id_vacante = forEntidad.id_vacante;
    this.vacante.id_entidad = forEntidad.id_entidad;
    this.vacante.id_unidad_centro = forEntidad.id_unidad_centro;
    this.vacante.num_alumnos = forEntidad.num_alumnos;
  }

  getVacantes() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  addVacante(vacante: Vacante) {
    const body = JSON.stringify(vacante);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editVacante(vacante: Vacante) {
    const body = JSON.stringify(vacante);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteVacante(id: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
  }
}
