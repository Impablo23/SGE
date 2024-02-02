import { Injectable } from '@angular/core';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';
import { UnidadesCentro } from '../shared/interfaces/unidades-centro';

const ENDPOINT = 'unidades_centro';


@Injectable({
  providedIn: 'root'
})
export class UnidadesCentroService {

  unidadesCentro: UnidadesCentro[];
  unidadCentro: UnidadesCentro;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  setUnidadCentro(unidadCentro: UnidadesCentro) {
    this.unidadCentro = unidadCentro;
  }

  setDatosBasicosUnidadCentro(formEntidad: any){
    this.unidadCentro.id_unidad_centro = formEntidad.id_unidad_centro;
    this.unidadCentro.unidad_centro = formEntidad.unidad_centro;
    this.unidadCentro.id_ciclo = formEntidad.id_ciclo;
    this.unidadCentro.obvervaciones = formEntidad.obvervaciones;
  }

  get() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  getAllUnidadesCentro() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  addUnidadesCentro(unidadesCentro: UnidadesCentro) {
    const body = JSON.stringify(unidadesCentro);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editUnidadesCentro(unidadesCentro: UnidadesCentro) {
    const body = JSON.stringify(unidadesCentro);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteUnidadesCentro(id: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
  }
}
