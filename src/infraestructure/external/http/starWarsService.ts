import axios, {AxiosInstance} from 'axios';
import {IStarWarsCharacter} from '../../../domain/entities/starWarsCharacter';
import {IStarWarsService} from '../../../domain/services/starWarsService';

export class StarWarsService implements IStarWarsService {
  private readonly httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.SWAPI_ENDPOINT_URL,
    });
  }

  async getCharacterById(id: number): Promise<IStarWarsCharacter> {
    const result = await this.httpClient.get(`people/${id}`);
    return result.data;
  }
}
