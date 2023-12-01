import {IPersonWithTranslatedKeys, PersonWithTranslatedKeys} from './personWithTranslatedKeys';
import {IStarWarsCharacter} from './starWarsCharacter';

export interface IPerson {
  uuid: string;
  swapiPersonId: string;
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  homeWorld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export class Person implements IPerson {
  uuid!: string;
  swapiPersonId!: string;
  name!: string;
  height!: string;
  mass!: string;
  hairColor!: string;
  skinColor!: string;
  eyeColor!: string;
  birthYear!: string;
  gender!: string;
  homeWorld!: string;
  films!: string[];
  species!: string[];
  vehicles!: string[];
  starships!: string[];
  created!: string;
  edited!: string;
  url!: string;

  static toObjectWithTranslatedKeys(person: IPerson): IPersonWithTranslatedKeys {
    const personWithTranslatedKeys = new PersonWithTranslatedKeys();
    personWithTranslatedKeys.id = person.uuid;
    personWithTranslatedKeys.star_wars_id = person.swapiPersonId;
    personWithTranslatedKeys.nombre = person.name;
    personWithTranslatedKeys.altura = person.height;
    personWithTranslatedKeys.peso = person.mass;
    personWithTranslatedKeys.color_cabello = person.hairColor;
    personWithTranslatedKeys.color_piel = person.skinColor;
    personWithTranslatedKeys.color_ojo = person.eyeColor;
    personWithTranslatedKeys.fecha_nacimiento = person.birthYear;
    personWithTranslatedKeys.genero = person.gender;
    personWithTranslatedKeys.planeta_origen = person.homeWorld;
    personWithTranslatedKeys.peliculas = person.films;
    personWithTranslatedKeys.especies = person.species;
    personWithTranslatedKeys.vehiculos = person.vehicles;
    personWithTranslatedKeys.naves = person.starships;
    personWithTranslatedKeys.fecha_creacion = person.created;
    personWithTranslatedKeys.fecha_edicion = person.edited;
    personWithTranslatedKeys.url = person.url;
    return personWithTranslatedKeys;
  }

  static fromStarWarsCharacter(startWarsCharacter: IStarWarsCharacter): IPerson {
    const person = new Person();
    person.name = startWarsCharacter.name;
    person.height = startWarsCharacter.height;
    person.mass = startWarsCharacter.mass;
    person.hairColor = startWarsCharacter.hair_color;
    person.skinColor = startWarsCharacter.skin_color;
    person.eyeColor = startWarsCharacter.eye_color;
    person.birthYear = startWarsCharacter.birth_year;
    person.gender = startWarsCharacter.gender;
    person.homeWorld = startWarsCharacter.homeworld;
    person.films = startWarsCharacter.films;
    person.species = startWarsCharacter.species;
    person.vehicles = startWarsCharacter.vehicles;
    person.starships = startWarsCharacter.starships;
    person.created = startWarsCharacter.created;
    person.edited = startWarsCharacter.edited;
    person.url = startWarsCharacter.url;
    return person;
  }

  static fromObjectWithTranslatedKeys(personWithTranslatedKeys: IPersonWithTranslatedKeys): IPerson {
    const person = new Person();
    person.name = personWithTranslatedKeys.nombre;
    person.height = personWithTranslatedKeys.altura;
    person.mass = personWithTranslatedKeys.peso;
    person.hairColor = personWithTranslatedKeys.color_cabello;
    person.skinColor = personWithTranslatedKeys.color_piel;
    person.eyeColor = personWithTranslatedKeys.color_ojo;
    person.birthYear = personWithTranslatedKeys.fecha_nacimiento;
    person.gender = personWithTranslatedKeys.genero;
    person.homeWorld = personWithTranslatedKeys.planeta_origen;
    person.films = personWithTranslatedKeys.peliculas;
    person.species = personWithTranslatedKeys.especies;
    person.vehicles = personWithTranslatedKeys.vehiculos;
    person.starships = personWithTranslatedKeys.naves;
    person.created = personWithTranslatedKeys.fecha_creacion;
    person.edited = personWithTranslatedKeys.fecha_edicion;
    person.url = personWithTranslatedKeys.url;
    return person;
  }
}
