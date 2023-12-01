import {IStarWarsCharacter} from '../entities/starWarsCharacter';

export interface IStarWarsService {
  getCharacterById(id: number): Promise<IStarWarsCharacter>;
}
