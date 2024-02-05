export enum NivelIngles {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}


export interface Alumno {
  id_alumno: number;
  id_unidad_centro: number;
  nombre_completo_alumno: string;
  fecha_nacimiento_alumno: string;
  documentacion_alumno: string;
  linkedin_alumno: string;
  nivel_ingles_alumno: NivelIngles;
  minusvalia: number;
  otra_formacion: string;
}
