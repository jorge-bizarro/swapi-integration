import type { IStarWarsCharacter } from "@/domain/entities/starWarsCharacter";
import type { IStarWarsService } from "@/domain/services/starWarsService";

export class StarWarsService implements IStarWarsService {
    private readonly baseURL: string;

    constructor() {
        this.baseURL = process.env.SWAPI_ENDPOINT_URL || "";
    }

    async getCharacterById(id: number): Promise<IStarWarsCharacter> {
        const response = await fetch(`${this.baseURL}/people/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error fetching SWAPI character: ${response.status}`);
        }
        return (await response.json()) as IStarWarsCharacter;
    }
}
