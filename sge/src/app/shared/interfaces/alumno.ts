export interface Alumno {
  id_alumno: number;
  id_unidad_centro: number;
  nombre_alumno: string;
  apellidos_alumno: string;
  fecha_nacimiento_alumno: Date;
  documentacion_alumno: string;
  linkedin_alumno?: string;
  nivel_ingles_alumno?: string;
  minusvalia?: number;
  otra_formacion?: string;
}
