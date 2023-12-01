export interface IPersonWithTranslatedKeys {
  id: string;
  star_wars_id: string;
  nombre: string;
  altura: string;
  peso: string;
  color_cabello: string;
  color_piel: string;
  color_ojo: string;
  fecha_nacimiento: string;
  genero: string;
  planeta_origen: string;
  peliculas: string[];
  especies: string[];
  vehiculos: string[];
  naves: string[];
  fecha_creacion: string;
  fecha_edicion: string;
  url: string;
}

export class PersonWithTranslatedKeys implements IPersonWithTranslatedKeys {
  id!: string;
  star_wars_id!: string;
  nombre!: string;
  altura!: string;
  peso!: string;
  color_cabello!: string;
  color_piel!: string;
  color_ojo!: string;
  fecha_nacimiento!: string;
  genero!: string;
  planeta_origen!: string;
  peliculas!: string[];
  especies!: string[];
  vehiculos!: string[];
  naves!: string[];
  fecha_creacion!: string;
  fecha_edicion!: string;
  url!: string;
}
