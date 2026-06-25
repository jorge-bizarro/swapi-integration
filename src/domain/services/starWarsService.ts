import type { IStarWarsCharacter } from "@/domain/entities/starWarsCharacter";

export interface IStarWarsService {
    getCharacterById(id: number): Promise<IStarWarsCharacter>;
}
